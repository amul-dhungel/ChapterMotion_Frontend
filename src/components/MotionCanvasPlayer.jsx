import React, { useEffect, useRef } from 'react';
import './MotionCanvasPlayer.css';

const MotionCanvasPlayer = ({ onClose }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 800;
        canvas.height = 600;

        // Animation state
        let time = 0;
        let isPlaying = true;
        let isDragging = false;
        let dragTarget = null;

        // Objects
        const objects = {
            ground: {
                y: 500,
                color: '#228B22'
            },
            tree: {
                trunk: { x: 200, y: 400, width: 40, height: 150, color: '#8B4513' },
                leaves: { x: 200, y: 325, radius: 80, color: '#2E7D32' }
            },
            apple: {
                x: 200,
                y: 300,
                radius: 20,
                color: '#FF0000',
                falling: false,
                velocity: 0,
                draggable: true
            },
            arrow: {
                visible: true,
                color: '#FFD700'
            }
        };

        // Physics
        const gravity = 0.5;

        // Draw functions
        const drawGround = () => {
            ctx.strokeStyle = objects.ground.color;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(50, objects.ground.y);
            ctx.lineTo(750, objects.ground.y);
            ctx.stroke();
        };

        const drawTree = () => {
            // Trunk
            ctx.fillStyle = objects.tree.trunk.color;
            ctx.fillRect(
                objects.tree.trunk.x - objects.tree.trunk.width / 2,
                objects.tree.trunk.y,
                objects.tree.trunk.width,
                objects.tree.trunk.height
            );

            // Leaves
            ctx.fillStyle = objects.tree.leaves.color;
            ctx.beginPath();
            ctx.arc(
                objects.tree.leaves.x,
                objects.tree.leaves.y,
                objects.tree.leaves.radius,
                0,
                Math.PI * 2
            );
            ctx.fill();
        };

        const drawApple = () => {
            ctx.fillStyle = objects.apple.color;
            ctx.beginPath();
            ctx.arc(objects.apple.x, objects.apple.y, objects.apple.radius, 0, Math.PI * 2);
            ctx.fill();

            // Highlight if draggable
            if (objects.apple.draggable) {
                ctx.strokeStyle = '#00D2FF';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        };

        const drawArrow = () => {
            if (!objects.arrow.visible) return;

            ctx.strokeStyle = objects.arrow.color;
            ctx.fillStyle = objects.arrow.color;
            ctx.lineWidth = 3;

            // Arrow line
            ctx.beginPath();
            ctx.moveTo(objects.apple.x, objects.apple.y + objects.apple.radius);
            ctx.lineTo(objects.apple.x, objects.apple.y + objects.apple.radius + 60);
            ctx.stroke();

            // Arrow head
            ctx.beginPath();
            ctx.moveTo(objects.apple.x, objects.apple.y + objects.apple.radius + 60);
            ctx.lineTo(objects.apple.x - 8, objects.apple.y + objects.apple.radius + 50);
            ctx.lineTo(objects.apple.x + 8, objects.apple.y + objects.apple.radius + 50);
            ctx.closePath();
            ctx.fill();

            // Label
            ctx.font = '16px Arial';
            ctx.fillText('Gravity', objects.apple.x + 25, objects.apple.y + objects.apple.radius + 40);
        };

        const drawText = () => {
            ctx.fillStyle = '#1D1D1F';
            ctx.font = 'bold 24px Arial';
            ctx.fillText('Interactive Apple Fall', 250, 40);

            ctx.font = '16px Arial';
            ctx.fillText('Drag the apple to move it!', 280, 65);
        };

        // Animation loop
        const animate = () => {
            ctx.fillStyle = '#FDF5E6';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawGround();
            drawTree();
            drawApple();
            drawArrow();
            drawText();

            // Physics simulation
            if (objects.apple.falling && !isDragging) {
                objects.apple.velocity += gravity;
                objects.apple.y += objects.apple.velocity;

                // Stop at ground
                if (objects.apple.y + objects.apple.radius >= objects.ground.y) {
                    objects.apple.y = objects.ground.y - objects.apple.radius;
                    objects.apple.velocity = 0;
                    objects.apple.falling = false;
                    objects.arrow.visible = false;
                }
            }

            // Auto-start falling after 1 second
            if (time > 60 && !objects.apple.falling && objects.apple.y < 400) {
                objects.apple.falling = true;
            }

            if (isPlaying) {
                time++;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        // Mouse interaction
        const getMousePos = (e) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const isPointInApple = (x, y) => {
            const dx = x - objects.apple.x;
            const dy = y - objects.apple.y;
            return Math.sqrt(dx * dx + dy * dy) <= objects.apple.radius;
        };

        const handleMouseDown = (e) => {
            const pos = getMousePos(e);
            if (isPointInApple(pos.x, pos.y)) {
                isDragging = true;
                dragTarget = 'apple';
                canvas.style.cursor = 'grabbing';
            }
        };

        const handleMouseMove = (e) => {
            const pos = getMousePos(e);

            if (isDragging && dragTarget === 'apple') {
                objects.apple.x = pos.x;
                objects.apple.y = pos.y;
                objects.apple.falling = false;
                objects.apple.velocity = 0;
                objects.arrow.visible = true;
            } else if (isPointInApple(pos.x, pos.y)) {
                canvas.style.cursor = 'grab';
            } else {
                canvas.style.cursor = 'default';
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                dragTarget = null;
                objects.apple.falling = true;
                canvas.style.cursor = 'default';
            }
        };

        // Event listeners
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseUp);

        // Start animation
        animate();

        // Cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseleave', handleMouseUp);
        };
    }, []);

    return (
        <div className="motion-canvas-player">
            <div className="canvas-container">
                <canvas ref={canvasRef} />
                <button className="close-btn" onClick={onClose}>×</button>
            </div>
            <div className="controls-info">
                <p>🎯 <strong>Interactive Features:</strong></p>
                <ul>
                    <li>Drag the apple to move it anywhere</li>
                    <li>Release to see gravity in action</li>
                    <li>Physics simulation with realistic falling</li>
                </ul>
            </div>
        </div>
    );
};

export default MotionCanvasPlayer;
