import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function ModelViewer({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    if (typeof WebGLRenderingContext === 'undefined') return

    let disposed = false
    let raf = 0
    let renderer: THREE.WebGLRenderer | null = null

    try {
      const width = mount.clientWidth
      const height = mount.clientHeight
      if (width === 0 || height === 0) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
      camera.position.set(4.5, 4.5, 5.5)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      mount.appendChild(renderer.domElement)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.08
      controls.autoRotate = true
      controls.autoRotateSpeed = 1.6

      const loader = new GLTFLoader()
      loader.load(
        src,
        (gltf) => {
          if (disposed) return
          const model = gltf.scene
          const box = new THREE.Box3().setFromObject(model)
          const size = box.getSize(new THREE.Vector3())
          const center = box.getCenter(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z) || 1
          const fit = 4.4 / maxDim
          model.scale.setScalar(fit)
          model.position.sub(center.clone().multiplyScalar(fit))
          scene.add(model)
          controls.target.set(0, 0.4, 0)
          controls.update()
        },
        undefined,
        () => {
          // 模型加载失败时静默保持空白画布
        },
      )

      scene.add(new THREE.AmbientLight(0xffffff, 1.1))
      const key = new THREE.DirectionalLight(0xffffff, 2.2)
      key.position.set(5, 10, 7)
      scene.add(key)
      const fill = new THREE.DirectionalLight(0xffffff, 0.6)
      fill.position.set(-5, 2, -4)
      scene.add(fill)

      const animate = () => {
        raf = requestAnimationFrame(animate)
        controls.update()
        renderer!.render(scene, camera)
      }
      animate()

      const onResize = () => {
        if (disposed || !renderer) return
        const w = mount.clientWidth
        const h = mount.clientHeight
        if (w === 0 || h === 0) return
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      return () => {
        disposed = true
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', onResize)
        controls.dispose()
        if (renderer) {
          renderer.dispose()
          if (renderer.domElement.parentNode === mount) {
            mount.removeChild(renderer.domElement)
          }
        }
      }
    } catch {
      return
    }
  }, [src])

  return <div ref={mountRef} role="img" aria-label={alt} className={className} />
}
