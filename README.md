# Monomotion - Coming Soon Page

A modern, dark-themed placeholder page for Monomotion featuring a spinning 3D model background.

## Quick Start with Docker

### Development (with hot reload)

```bash
docker-compose up dev
```

Access at: http://localhost:5173

### Production

```bash
docker-compose up prod --build
```

Access at: http://localhost:80

## Adding Your 3D Model

1. **Convert your STEP file to GLB format** using one of these options:
   - [Blender](https://www.blender.org/) (free): Import STEP → Export as GLB
   - [FreeCAD](https://www.freecad.org/) (free): Open STEP → Export as GLTF
   - Online converter: https://imagetostl.com/convert/file/step/to/glb

2. **Place the model** in the `public/` folder as `model.glb`

3. **Update `src/App.tsx`** to use your model:
   ```tsx
   const modelUrl = '/model.glb'; // Change from undefined to this
   ```

4. **Rebuild** if running in production:
   ```bash
   docker-compose up prod --build
   ```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ComingSoonCard.tsx    # Central overlay card
│   │   └── Model3D.tsx           # 3D model with rotation
│   ├── theme/
│   │   └── darkTheme.ts          # MUI dark theme
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── public/
│   └── model.glb                 # Your 3D model (add this)
├── Dockerfile                    # Multi-stage build
├── docker-compose.yml            # Dev & prod services
└── nginx.conf                    # Production server config
```

## Tech Stack

- React 18 + TypeScript
- Material UI v5
- Three.js + React Three Fiber
- Vite
- Docker + nginx

