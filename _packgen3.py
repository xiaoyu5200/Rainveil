# -*- coding: utf-8 -*-
import os, io, json, glob, yaml

RES = r"D:\1.21.11\plugins\CraftEngine\resources"
SITE = r"D:\服务器官网+玩法文档\rainveil-site"
OUT = os.path.join(SITE, "src", "content", "packs")

# texture overrides for items whose resourcepack texture name differs (typo / reused model texture)
OVERRIDE = {
 "corn_kernel_bag": "block/corn_kernal_bag_top.png",
 "popcorn_box": "block/popcorn.png",
 "corn_crate": "block/corn_crate_side.png",
 "stuffed_pumpkin_block": "item/stuffed_pumpkin_block.png",
}
PACKS = [
 ("corn_delight","corn","玉米乐事","围绕玉米的收获、加工与料理，从玉米棒到爆米花、玉米狗一应俱全。"),
 ("dumplings_delight","dumplings","饺子乐事","包罗万象的手工饺子与中式面点，馅料与吃法都充满讲究。"),
 ("rusticdelight","rustic","乡村乐事","质朴的田园食材与家常菜，重拾慢生活里的烟火气。"),
 ("veggiesdelight","veggies","蔬菜乐事","琳琅满目的时蔬与清爽菜肴，多吃蔬菜身体好。"),
 ("ends_delight","ends","末地乐事","末地风味的作物与料理，在异界也要好好吃饭。"),
 ("chicken_changezi","chicken","鸡块换子","轻量小食与鸡肉小点，适合随时解馋。"),
]
def js(s): return json.dumps(s, ensure_ascii=False)
def load_yaml(p):
    try:
        with io.open(p, encoding="utf-8") as f: return yaml.safe_load(f)
    except Exception: return None
def find_items(conf_dir):
    items={}
    cfg=os.path.join(conf_dir,"configuration")
    for root,_,files in os.walk(cfg):
        for fn in files:
            if not fn.endswith(".yml") or fn.endswith(".disabled"): continue
            p=os.path.join(root,fn); base=fn
            if base in ("recipes.yml","categories.yml","features.yml","mappings.yml","gui.yml","offset_chars.yml"): continue
            if os.sep+"lang"+os.sep in p: continue
            d=load_yaml(p)
            if not isinstance(d,dict): continue
            group={"foods.yml":"food","ingredients.yml":"ingredient","crops":"crop","crop_entity.yml":"crop","blocks.yml":"block","crop_block.yml":"crop"}.get(base,"item")
            for sec in ("items","blocks"):
                c=d.get(sec)
                if isinstance(c,dict):
                    for k in c: items[k]=group
            for v in d.values():
                if isinstance(v,dict) and "blueprint" in v and isinstance(v["blueprint"],dict):
                    bp=v["blueprint"]
                    for sec in ("items","blocks"):
                        c=bp.get(sec)
                        if isinstance(c,dict):
                            for k in c: items[k]=group
    return items
def load_names(conf_dir, ns):
    names={}
    p=os.path.join(conf_dir,"configuration","lang","zh_cn.yml")
    if not os.path.isfile(p): return names
    d=load_yaml(p)
    if not isinstance(d,dict): return names
    root=None
    for key,val in d.items():
        if key.startswith("lang#") or key=="lang":
            root=val
            if isinstance(val,dict) and "zh_cn" in val: root=val["zh_cn"]
            break
    if not isinstance(root,dict):
        for val in d.values():
            if isinstance(val,dict) and isinstance(val.get("zh_cn"),dict): root=val["zh_cn"]; break
    if not isinstance(root,dict): return names
    for k,v in root.items():
        if isinstance(v,str) and (k.startswith("item."+ns+".") or k.startswith("block."+ns+".")):
            names[k.split(".",2)[2]]=v
    return names
def fuzzy_tex(asset_dir, short):
    if "/" in short or not short: return None
    if short in OVERRIDE:
        cand=OVERRIDE[short]
        p=os.path.join(asset_dir,*cand.split("/"))
        if os.path.isfile(p): return cand
    cands=[short, short+"_side", short+"_top", short+"_front", short+"_bottom", short+"_inner", short+"_stage"]
    for sub in ("item","block"):
        for base in cands:
            p=os.path.join(asset_dir, sub, base+".png")
            if os.path.isfile(p): return sub+"/"+base+".png"
        ms=glob.glob(os.path.join(asset_dir, sub, short+"*.png"))
        if ms: return sub+"/"+os.path.basename(sorted(ms)[0])
    return None
def norm_ing(v):
    if isinstance(v,str): return v
    if isinstance(v,dict):
        if "item" in v and isinstance(v["item"],str): return v["item"]
        if "any_of" in v and isinstance(v["any_of"],list):
            for a in v["any_of"]:
                r=norm_ing(a)
                if r: return r
        if "items" in v and isinstance(v["items"],list) and v["items"]: return v["items"][0] if isinstance(v["items"][0],str) else None
        if "tag" in v: return v["tag"]
    return None
def extract_recipes(conf_dir, ns):
    p=os.path.join(conf_dir,"configuration","recipes.yml")
    if not os.path.isfile(p): return []
    d=load_yaml(p)
    if not d or "recipes" not in d: return []
    ST={"smelting":"熔炉","smoking":"烟熏炉","campfire_cooking":"营火","smithing_transform":"锻造台"}
    TY={"smelting":"smelting","smoking":"smoking","campfire_cooking":"campfire","smithing_transform":"smithing"}
    out=[]
    for rid,r in (d["recipes"] or {}).items():
        if not isinstance(r,dict): continue
        res=r.get("result"); typ=r.get("type")
        if isinstance(res,dict): res_id=res.get("id"); count=res.get("count",1)
        elif isinstance(res,str): res_id=res; count=1
        else: continue
        if not res_id or (":" in res_id and res_id.split(":")[0]!=ns): continue
        e={"id":rid,"name":res_id.split(":")[-1],"result":res_id,"count":count}
        if typ=="shaped" and r.get("pattern"):
            ch={ch:norm_ing(v) for ch,v in (r.get("ingredients") or {}).items()}
            slots=[]
            for row in r["pattern"]:
                for c in row: slots.append(ch.get(c))
            while len(slots)<9: slots.append(None)
            e.update(type="crafting",grid=slots,station="工作台")
        elif typ=="shapeless":
            e.update(type="crafting",grid=[norm_ing(x) for x in (r.get("ingredients") or [])],station="工作台",shapeless=True)
        elif typ in ST: e.update(type=TY[typ],grid=[norm_ing(r.get("ingredient"))],station=ST[typ])
        elif typ=="smithing_transform":
            tpl=norm_ing(r.get("template")) or "minecraft:netherite_upgrade_smithing_template"
            e.update(type="smithing",grid=[tpl,norm_ing(r.get("base")),norm_ing(r.get("addition"))],station="锻造台")
        else: continue
        out.append(e)
    return out

for folder,slug,name,blurb in PACKS:
    conf_dir=os.path.join(RES,folder)
    if not os.path.isdir(conf_dir): continue
    asset_dir=os.path.join(conf_dir,"resourcepack","assets",folder,"textures")
    items_map=find_items(conf_dir); names=load_names(conf_dir,folder); recipes=extract_recipes(conf_dir,folder)
    recipe_items=set()
    for r in recipes:
        recipe_items.add(r["result"])
        for g in r.get("grid") or []:
            if g: recipe_items.add(g)
    catalog={}
    for id_,grp in items_map.items():
        short=id_.split(":")[-1] if ":" in id_ else id_
        if "/" in short: continue
        tx=fuzzy_tex(asset_dir,short)
        if tx: catalog[id_]=tx
    for id_ in recipe_items:
        if not isinstance(id_,str) or "/" in id_ or id_ in catalog: continue
        if ":" in id_ and id_.split(":")[0]!=folder: continue
        short=id_.split(":")[-1] if ":" in id_ else id_
        tx=fuzzy_tex(asset_dir,short)
        if tx: catalog[id_]=tx
    itemlist=[]
    for id_,tx in catalog.items():
        short=id_.split(":")[-1] if ":" in id_ else id_
        itemlist.append({"id":id_,"name":names.get(short,short),"texture":"/%s/%s"%(slug,tx),"group":items_map.get(id_,"item")})
    itemlist.sort(key=lambda x:(x["group"],x["name"]))
    groups=["crop","ingredient","food","block","item"]
    gname={"crop":"作物","ingredient":"食材","food":"食物","block":"方块与家具","item":"物品"}
    sections=[{"key":g,"label":gname.get(g,g),"desc":"","group":[g]} for g in groups if any(it["group"]==g for it in itemlist)]
    parts=["import type { ContentPack, PackItem } from '../packTypes'","import type { CraftingRecipe } from '../farmingRecipes'","",
           "const items: PackItem[] = %s"%js(itemlist),"const recipes: CraftingRecipe[] = %s"%js(recipes),"const sections = %s"%js(sections),"",
           "export const pack: ContentPack = {","  key: %s,"%js(slug),"  namespace: %s,"%js(folder),"  name: %s,"%js(name),"  blurb: %s,"%js(blurb),"  sections,","  items,","  recipes,","}",""]
    with io.open(os.path.join(OUT,slug+".ts"),"w",encoding="utf-8") as f: f.write("\n".join(parts))
    print("wrote %s: %d items, %d recipes" % (slug,len(itemlist),len(recipes)))
