import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import generateHandler from './api/generate.js'

export default defineConfig(({ mode }) => {
  // Load env file from the current directory
  const env = loadEnv(mode, process.cwd(), '')
  
  // Set the environment variable for our local API handler
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'vercel-api-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            // Intercept POST /api/generate calls
            if (req.url?.startsWith('/api/generate') && req.method === 'POST') {
              let body = ''
              req.on('data', chunk => { body += chunk })
              req.on('end', async () => {
                try {
                  const parsedBody = JSON.parse(body)
                  
                  // Mock request and response objects for Vercel handler
                  const mockReq = { 
                    method: 'POST', 
                    body: parsedBody 
                  }
                  
                  const mockRes = {
                    statusCode: 200,
                    headers: {},
                    setHeader(name, value) {
                      this.headers[name] = value
                      res.setHeader(name, value)
                    },
                    status(code) {
                      this.statusCode = code
                      res.statusCode = code
                      return this
                    },
                    json(data) {
                      this.setHeader('Content-Type', 'application/json')
                      res.end(JSON.stringify(data))
                    }
                  }
                  
                  await generateHandler(mockReq, mockRes)
                } catch (err) {
                  console.error("Local API Handler Error:", err)
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: err.message || "Failed to process request" }))
                }
              })
            } else {
              next()
            }
          })
        }
      }
    ]
  }
})
