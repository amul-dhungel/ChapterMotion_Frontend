from manimlib import *

class InteractiveApple(Scene):
    def construct(self):
        # Interactive scene with ManimGL
        # You can pause, rotate, zoom during playback!
        
        # Environment
        ground = Line(LEFT * 5, RIGHT * 5, color=GREEN).to_edge(DOWN, buff=1)
        
        # Tree
        trunk = Rectangle(width=0.5, height=3, fill_opacity=1, color="#8B4513").next_to(ground, UP, buff=0)
        leaves = Circle(radius=1.5, fill_opacity=1, color=GREEN_D).move_to(trunk.get_top() + UP * 0.8)
        tree = VGroup(trunk, leaves)
        
        # Apple
        apple = Dot(color=RED, radius=0.3)
        apple.move_to(leaves.get_center() + DOWN * 0.5)
        
        # Add everything
        self.add(ground, tree, apple)
        self.wait()
        
        # Gravity arrow
        arrow = Arrow(apple.get_center(), apple.get_center() + DOWN * 1.5, color=YELLOW)
        self.play(GrowArrow(arrow))
        self.wait()
        
        # Fall animation - using smooth rate function
        self.play(
            apple.animate.move_to(ground.get_center() + UP * 0.3),
            run_time=1,
            rate_func=smooth  # ManimGL uses 'smooth' instead of rate_functions.ease_in_quad
        )
        
        self.play(FadeOut(arrow))
        self.play(Indicate(apple))
        
        # Interactive text
        text = Text("Use mouse to rotate! Press 'q' to quit.", font_size=24)
        text.to_edge(UP)
        self.play(Write(text))
        
        self.wait(5)  # Keep window open for interaction
