import { useEffect, useRef } from 'react'

export default function ProcessDiagram() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationTime = 0
    let particles = []

    // Set canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement
      const maxWidth = Math.min(1400, container?.clientWidth || 1400)
      const aspectRatio = 16 / 10
      canvas.width = maxWidth
      canvas.height = maxWidth / aspectRatio
      canvas.style.width = `${maxWidth}px`
      canvas.style.height = `${maxWidth / aspectRatio}px`
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1
      })
    }

    function drawRoundedRect(x, y, width, height, radius, fillColor, strokeColor) {
      ctx.fillStyle = fillColor
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 2
      
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }

    function drawIcon(x, y, type, size = 30) {
      ctx.save()
      ctx.lineWidth = 2
      switch(type) {
        case 'api':
          ctx.strokeStyle = '#3b82f6'
          ctx.fillStyle = '#60a5fa'
          ctx.beginPath()
          ctx.arc(x, y, size/2, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2
            ctx.fillRect(x + Math.cos(angle) * size/2 - 2, y + Math.sin(angle) * size/2 - 2, 4, size/3)
          }
          break
        
        case 'database':
          ctx.strokeStyle = '#10b981'
          ctx.fillStyle = '#34d399'
          ctx.beginPath()
          ctx.ellipse(x, y - size/3, size/2, size/6, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          ctx.fillRect(x - size/2, y - size/3, size, size/1.5)
          ctx.strokeRect(x - size/2, y - size/3, size, size/1.5)
          ctx.beginPath()
          ctx.ellipse(x, y + size/6, size/2, size/6, 0, 0, Math.PI * 2)
          ctx.stroke()
          break
        
        case 'cloud':
          ctx.strokeStyle = '#8b5cf6'
          ctx.fillStyle = '#a78bfa'
          ctx.beginPath()
          ctx.arc(x - size/4, y, size/3, Math.PI, 0)
          ctx.arc(x + size/4, y, size/3, Math.PI, 0)
          ctx.arc(x, y - size/4, size/3, 0, Math.PI)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
          break
        
        case 'pipeline':
          ctx.strokeStyle = '#ef4444'
          ctx.fillStyle = '#f87171'
          for (let i = 0; i < 3; i++) {
            ctx.fillRect(x - size/2 + i * size/2.5, y - size/6, size/4, size/3)
            if (i < 2) {
              ctx.beginPath()
              ctx.moveTo(x - size/4 + i * size/2.5, y)
              ctx.lineTo(x - size/8 + i * size/2.5, y)
              ctx.stroke()
            }
          }
          break
        
        case 'docker':
          ctx.strokeStyle = '#2563eb'
          ctx.fillStyle = '#3b82f6'
          for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 3; col++) {
              ctx.fillRect(x - size/3 + col * size/3, y - size/4 + row * size/2.5, size/4, size/4)
            }
          }
          break
        
        case 'kubernetes':
          ctx.strokeStyle = '#2563eb'
          ctx.fillStyle = '#3b82f6'
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const px = x + Math.cos(angle) * size/2
            const py = y + Math.sin(angle) * size/2
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(x, y, size/4, 0, Math.PI * 2)
          ctx.fillStyle = '#1e40af'
          ctx.fill()
          break
        
        case 'brain':
          ctx.strokeStyle = '#8b5cf6'
          ctx.fillStyle = '#a78bfa'
          ctx.beginPath()
          ctx.arc(x - size/6, y, size/3, 0, Math.PI * 2)
          ctx.arc(x + size/6, y, size/3, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
          for (let i = 0; i < 5; i++) {
            ctx.beginPath()
            ctx.moveTo(x - size/4, y - size/4 + i * size/8)
            ctx.lineTo(x + size/4, y - size/4 + i * size/8)
            ctx.stroke()
          }
          break
        
        case 'neural':
          ctx.strokeStyle = '#a855f7'
          ctx.fillStyle = '#c084fc'
          const layers = 3
          const nodesPerLayer = 3
          for (let l = 0; l < layers; l++) {
            for (let n = 0; n < nodesPerLayer; n++) {
              const nx = x - size/2 + l * size/2
              const ny = y - size/3 + n * size/3
              ctx.beginPath()
              ctx.arc(nx, ny, size/8, 0, Math.PI * 2)
              ctx.fill()
              ctx.stroke()
            }
          }
          break
        
        case 'model':
          ctx.strokeStyle = '#ec4899'
          ctx.fillStyle = '#f472b6'
          ctx.beginPath()
          ctx.moveTo(x - size/2, y + size/2)
          ctx.lineTo(x, y - size/2)
          ctx.lineTo(x + size/2, y + size/2)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 12px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('ML', x, y + size/4)
          break
        
        case 'chart':
          ctx.strokeStyle = '#10b981'
          ctx.fillStyle = '#34d399'
          ctx.strokeRect(x - size/2, y - size/2, size, size)
          const bars = [0.4, 0.6, 0.3, 0.8, 0.7]
          bars.forEach((h, i) => {
            ctx.fillRect(x - size/2.5 + i * size/5, y + size/2 - h * size, size/7, h * size)
          })
          break
        
        case 'growth':
          ctx.strokeStyle = '#10b981'
          ctx.fillStyle = '#34d399'
          ctx.beginPath()
          ctx.moveTo(x - size/2, y + size/2)
          ctx.lineTo(x - size/4, y)
          ctx.lineTo(x, y + size/4)
          ctx.lineTo(x + size/4, y - size/4)
          ctx.lineTo(x + size/2, y - size/2)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(x + size/2, y - size/2)
          ctx.lineTo(x + size/4, y - size/2)
          ctx.lineTo(x + size/2, y - size/4)
          ctx.closePath()
          ctx.fill()
          break
        
        case 'dashboard':
          ctx.strokeStyle = '#06b6d4'
          ctx.fillStyle = '#22d3ee'
          ctx.strokeRect(x - size/2, y - size/2, size, size)
          ctx.fillRect(x - size/2.5, y - size/2.5, size/2.5, size/2.5)
          ctx.fillRect(x + size/8, y - size/2.5, size/2.5, size/2.5)
          ctx.fillRect(x - size/2.5, y + size/8, size, size/2.5)
          break
      }
      ctx.restore()
    }

    function drawDashedArrow(x1, y1, x2, y2, dashOffset, color = '#60a5fa') {
      ctx.save()
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.setLineDash([10, 5])
      ctx.lineDashOffset = dashOffset
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      const angle = Math.atan2(y2 - y1, x2 - x1)
      ctx.setLineDash([])
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(x2, y2)
      ctx.lineTo(x2 - 15 * Math.cos(angle - Math.PI / 6), y2 - 15 * Math.sin(angle - Math.PI / 6))
      ctx.lineTo(x2 - 15 * Math.cos(angle + Math.PI / 6), y2 - 15 * Math.sin(angle + Math.PI / 6))
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    function drawBadge(x, y, text, color) {
      const padding = 6
      ctx.font = 'bold 11px sans-serif'
      const width = ctx.measureText(text).width + padding * 2
      const height = 18
      const radius = 9
      
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(x - width/2 + radius, y - 10)
      ctx.lineTo(x + width/2 - radius, y - 10)
      ctx.quadraticCurveTo(x + width/2, y - 10, x + width/2, y - 10 + radius)
      ctx.lineTo(x + width/2, y - 10 + height - radius)
      ctx.quadraticCurveTo(x + width/2, y - 10 + height, x + width/2 - radius, y - 10 + height)
      ctx.lineTo(x - width/2 + radius, y - 10 + height)
      ctx.quadraticCurveTo(x - width/2, y - 10 + height, x - width/2, y - 10 + height - radius)
      ctx.lineTo(x - width/2, y - 10 + radius)
      ctx.quadraticCurveTo(x - width/2, y - 10, x - width/2 + radius, y - 10)
      ctx.closePath()
      ctx.fill()
      
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.fillText(text, x, y + 3)
    }

    function drawSection(x, y, title, desc, icons, badges, color) {
      const sectionWidth = canvas.width * 0.25
      const sectionHeight = canvas.height * 0.35
      
      drawRoundedRect(x, y, sectionWidth, sectionHeight, 15, `rgba(${color}, 0.15)`, `rgba(${color}, 0.5)`)
      
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 20px sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText(title, x + 15, y + 35)
      
      ctx.font = '12px sans-serif'
      ctx.fillStyle = '#cbd5e1'
      const words = desc.split(' ')
      let line = ''
      let lineY = y + 55
      words.forEach(word => {
        const testLine = line + word + ' '
        if (ctx.measureText(testLine).width > sectionWidth - 30) {
          ctx.fillText(line, x + 15, lineY)
          line = word + ' '
          lineY += 16
        } else {
          line = testLine
        }
      })
      ctx.fillText(line, x + 15, lineY)

      icons.forEach((icon, i) => {
        const row = Math.floor(i / 4)
        const col = i % 4
        drawIcon(x + 40 + col * 60, y + 100 + row * 45, icon.type, 25)
        ctx.font = '9px sans-serif'
        ctx.fillStyle = '#94a3b8'
        ctx.textAlign = 'center'
        ctx.fillText(icon.label, x + 40 + col * 60, y + 130 + row * 45)
      })

      badges.forEach((badge, i) => {
        drawBadge(x + sectionWidth/2, y + sectionHeight - 30 + i * 22, badge.text, badge.color)
      })
    }

    function animate() {
      animationTime += 0.016

      // Background gradient
      const bgGradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width)
      bgGradient.addColorStop(0, '#0f172a')
      bgGradient.addColorStop(1, '#000000')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        
        ctx.fillStyle = `rgba(96, 165, 250, ${0.2 + Math.sin(animationTime * 2 + p.x) * 0.1})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Title removed as per user request

      const dashOffset = -(animationTime * 30) % 15

      // Calculate positions based on canvas size - Better spacing to avoid overlaps
      const sectionWidth = canvas.width * 0.22
      const sectionHeight = canvas.height * 0.28
      const hubX = canvas.width / 2
      const hubY = canvas.height * 0.38
      const hubRadius = canvas.width * 0.08
      
      const topY = 70
      const leftX = canvas.width * 0.05
      const rightX = canvas.width * 0.73
      const bottomY = canvas.height * 0.65

      // 1. DATA COLLECTION (Top Left)
      drawSection(
        leftX,
        topY,
        'Data Collection',
        'Gathering raw data from multiple sources including APIs, databases, cloud storage, and file systems',
        [
          { type: 'api', label: 'REST API' },
          { type: 'database', label: 'SQL/NoSQL' },
          { type: 'cloud', label: 'S3/Azure' },
          { type: 'database', label: 'MongoDB' },
          { type: 'cloud', label: 'Cloud' },
          { type: 'api', label: 'Streaming' }
        ],
        [
          { text: 'Multi-source', color: '#3b82f6' },
          { text: 'Real-time', color: '#10b981' }
        ],
        '59, 130, 246'
      )

      // Engineering Section Box (around the hub) - Draw first to be behind other elements
      const iconDistance = hubRadius + 60
      const engBoxPadding = 40
      const engBoxX = hubX - iconDistance - engBoxPadding
      const engBoxY = hubY - iconDistance - engBoxPadding
      const engBoxWidth = (iconDistance + engBoxPadding) * 2
      const engBoxHeight = (iconDistance + engBoxPadding) * 2
      
      drawRoundedRect(engBoxX, engBoxY, engBoxWidth, engBoxHeight, 15, 'rgba(239, 68, 68, 0.15)', 'rgba(239, 68, 68, 0.5)')
      
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 20px sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('Engineering', engBoxX + 15, engBoxY + 35)
      
      ctx.font = '12px sans-serif'
      ctx.fillStyle = '#cbd5e1'
      const engDesc = 'Building robust data pipelines and infrastructure using modern orchestration and distributed processing'
      const engWords = engDesc.split(' ')
      let engLine = ''
      let engLineY = engBoxY + 55
      engWords.forEach(word => {
        const testLine = engLine + word + ' '
        if (ctx.measureText(testLine).width > engBoxWidth - 30) {
          ctx.fillText(engLine, engBoxX + 15, engLineY)
          engLine = word + ' '
          engLineY += 16
        } else {
          engLine = testLine
        }
      })
      ctx.fillText(engLine, engBoxX + 15, engLineY)

      // Badges for Engineering
      drawBadge(engBoxX + engBoxWidth / 2, engBoxY + engBoxHeight - 30, '99.9% Uptime', '#10b981')
      drawBadge(engBoxX + engBoxWidth / 2, engBoxY + engBoxHeight - 8, 'Auto-scaling', '#8b5cf6')

      // Central Hub - Data Platform (Center) - Draw after Engineering box
      const hubGradient = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, hubRadius)
      hubGradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)')
      hubGradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)')
      
      ctx.fillStyle = hubGradient
      ctx.beginPath()
      ctx.arc(hubX, hubY, hubRadius, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)'
      ctx.lineWidth = 3
      ctx.shadowColor = 'rgba(168, 85, 247, 0.5)'
      ctx.shadowBlur = 30
      ctx.stroke()
      ctx.shadowBlur = 0
      
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 24px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Data', hubX, hubY - 8)
      ctx.fillText('Platform', hubX, hubY + 18)
      
      ctx.font = '11px sans-serif'
      ctx.fillStyle = '#cbd5e1'
      ctx.fillText('Unified System', hubX, hubY + 40)

      // Engineering Icons around Data Platform - Positioned to avoid overlaps
      const engineeringIcons = [
        { type: 'pipeline', label: 'ETL', angle: -Math.PI * 0.8, distance: iconDistance },
        { type: 'docker', label: 'Docker', angle: -Math.PI * 0.5, distance: iconDistance },
        { type: 'pipeline', label: 'Spark', angle: -Math.PI * 0.2, distance: iconDistance },
        { type: 'docker', label: 'Airflow', angle: Math.PI * 0.2, distance: iconDistance },
        { type: 'kubernetes', label: 'K8s', angle: Math.PI * 0.5, distance: iconDistance },
        { type: 'kubernetes', label: 'Kafka', angle: Math.PI * 0.8, distance: iconDistance }
      ]

      engineeringIcons.forEach((icon, i) => {
        const iconX = hubX + Math.cos(icon.angle) * icon.distance
        const iconY = hubY + Math.sin(icon.angle) * icon.distance
        drawIcon(iconX, iconY, icon.type, 25)
        ctx.font = '9px sans-serif'
        ctx.fillStyle = '#94a3b8'
        ctx.textAlign = 'center'
        ctx.fillText(icon.label, iconX, iconY + 20)
      })

      // 3. AI PROCESSING (Top Right) - Positioned to avoid Engineering box
      drawSection(
        rightX,
        topY,
        'AI Processing',
        'Transforming data into intelligent insights using machine learning models and advanced analytics',
        [
          { type: 'brain', label: 'Deep Learning' },
          { type: 'neural', label: 'Neural Net' },
          { type: 'model', label: 'ML Models' },
          { type: 'brain', label: 'NLP' },
          { type: 'neural', label: 'LLM' },
          { type: 'model', label: 'Agents' }
        ],
        [
          { text: '95%+ Accuracy', color: '#a855f7' },
          { text: 'GPU Accelerated', color: '#f59e0b' }
        ],
        '139, 92, 246'
      )

      // 4. BUSINESS IMPACT (Bottom Center) - Positioned below Engineering
      const businessX = hubX - sectionWidth / 2
      drawSection(
        businessX,
        bottomY,
        'Business Impact',
        'Driving measurable outcomes through actionable insights, KPI tracking, and data-driven decision making',
        [
          { type: 'chart', label: 'Analytics' },
          { type: 'growth', label: '+35% Growth' },
          { type: 'dashboard', label: 'BI Tools' },
          { type: 'chart', label: 'Reports' },
          { type: 'growth', label: 'KPIs' },
          { type: 'dashboard', label: 'Insights' }
        ],
        [
          { text: 'Measurable ROI', color: '#22c55e' },
          { text: 'Data-Driven', color: '#eab308' }
        ],
        '16, 185, 129'
      )

      // Animated Arrows - Fixed positions to avoid overlaps
      // Data Collection → Data Platform (Engineering)
      const dataCollectionRight = leftX + sectionWidth
      const dataCollectionCenterY = topY + sectionHeight / 2
      drawDashedArrow(dataCollectionRight, dataCollectionCenterY, hubX - hubRadius - 25, hubY - 20, dashOffset, '#60a5fa')
      
      // Data Platform → AI Processing
      const aiProcessingLeft = rightX
      const aiProcessingCenterY = topY + sectionHeight / 2
      drawDashedArrow(hubX + hubRadius + 25, hubY - 20, aiProcessingLeft, aiProcessingCenterY, dashOffset, '#ef4444')
      
      // Data Platform → Business Impact (downward)
      const businessCenterY = bottomY + sectionHeight / 2
      drawDashedArrow(hubX, hubY + hubRadius + 25, hubX, businessCenterY - 40, dashOffset, '#22d3ee')
      
      // AI Processing → Business Impact (diagonal arrow from bottom-right of AI to top-right of Business)
      const aiProcessingRight = rightX + sectionWidth
      const aiProcessingBottomY = topY + sectionHeight
      const businessRightX = businessX + sectionWidth
      const businessTopY = bottomY
      // Start from bottom-right corner of AI Processing, end at top-right corner of Business Impact
      drawDashedArrow(aiProcessingRight - 15, aiProcessingBottomY - 15, businessRightX - 15, businessTopY + 15, dashOffset, '#a855f7')

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-700 rounded-xl shadow-2xl max-w-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}

