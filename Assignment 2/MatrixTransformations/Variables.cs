namespace MatrixTransformations
{
    public class Variables
    {
        // Camera variable.
        public float r { get; set; } = 10;

        public float theta { get; set; } = -100;

        public float phi { get; set; } = -10;

        public float distance { get; set; } = 800;

        //Cube variables.
        public float scale { get; set; } = 1;

        public double translateX { get; set; } = 0.0;
        public double translateY { get; set; } = 0.0;
        public double translateZ { get; set; } = 0.0;

        public float rotateX { get; set; } = 0;
        public float rotateY { get; set; } = 0;
        public float rotateZ { get; set; } = 0;

        //Animation
        public int phase { get; set; } = 0;
    }
}