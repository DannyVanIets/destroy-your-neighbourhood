namespace MatrixTransformations
{
    public class Variables
    {
        // Camera variable.
        public float r { get; set; } = 10;
        public float theta { get; set; } = -100;
        public float phi { get; set; } = -10;
        public float distance { get; set; } = 800;

        public float scale { get; set; } = 1;

        // Translate the cube, should always be done after scaling and rotating!
        public float translateX { get; set; } = 0.0f;
        public float translateY { get; set; } = 0.0f;
        public float translateZ { get; set; } = 0.0f;

        // Rotate the cube.
        public float rotateX { get; set; } = 0;
        public float rotateY { get; set; } = 0;
        public float rotateZ { get; set; } = 0;

        //Animation
        public int phase { get; set; } = 0;
    }
}