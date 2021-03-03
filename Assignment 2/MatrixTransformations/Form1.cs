using System;
using MatrixTransformations.lecture_4;
using System.Collections.Generic;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace MatrixTransformations
{
    public partial class Form1 : Form
    {
        //Timer
        private Timer timer = new Timer();

        // Axes
        AxisX x_axis;
        AxisY y_axis;
        AxisZ z_axis; // TODO: does not work yet.

        // Objects
        Cube cube;

        // Window dimensions
        const int WIDTH = 800;
        const int HEIGHT = 600;

        private static Variables variables = new Variables();

        public Form1()
        {
            InitializeComponent();

            this.Width = WIDTH;
            this.Height = HEIGHT;
            this.DoubleBuffered = true;

            //Timer
            timer.Interval = 50;
            timer.Tick += TimerOnTick;

            // Define axes
            x_axis = new AxisX(200);
            y_axis = new AxisY(200);
            z_axis = new AxisZ(200); // TODO: does not work yet.

            // Create object
            cube = new Cube(Color.Purple);
        }

        private int subphase = 0;

        private void TimerOnTick(object sender, EventArgs e)
        {
            if (variables.phase == 1)
            {
                if (variables.scale < 1.5 && subphase == 0)
                {
                    variables.scale += 0.01f;
                }
                else if (variables.scale > 1 && subphase == 1)
                {
                    variables.scale -= 0.01f;
                }
                else if (variables.scale >= 1.5f)
                {
                    subphase = 1;
                }
                else
                {
                    subphase = 0;
                    variables.phase = 2;
                }

                variables.theta -= 1f;
            }
            else if (variables.phase == 2)
            {
                if (variables.rotateX < 45 && subphase == 0)
                {
                    variables.rotateX += 1f;
                }

                variables.theta -= 1;
            }
            else if (variables.phase == 3)
            {
                if (variables.rotateY < 45 && subphase == 0)
                {
                    variables.rotateY += 1f;
                }

                variables.phi += 1;
            }
            else
            {
                bool phidone = false;

                if (variables.phi > -10)
                {
                    variables.phi -= 1;
                }
                else
                {
                    phidone = true;
                }

                if (variables.theta < -100)
                {
                    variables.theta += 1;
                }
                else if (phidone)
                {
                    variables.phase = 1;
                }
            }

            this.UpdateLabels();
            this.Invalidate();
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);

            List<Vector> vb;

            // Update the labels.
            labelR.Text = variables.r.ToString();
            labelDistance.Text = variables.distance.ToString();
            labelPhi.Text = variables.phi.ToString();
            labelTheta.Text = variables.theta.ToString();

            // Draw axes
            vb = ViewportTransformation(x_axis.vb);
            x_axis.Draw(e.Graphics, vb);
            vb = ViewportTransformation(y_axis.vb);
            y_axis.Draw(e.Graphics, vb);
            vb = ViewportTransformation(z_axis.vb);
            z_axis.Draw(e.Graphics, vb);  // TODO: does not work yet.

            // Scale the cube.
            vb = Transform(cube.vertexbuffer, Matrix.ScaleMatrix((float)variables.scale));

            // Rotation.
            vb = Transform(vb, Matrix.RotateMatrixX((float)variables.rotateX));
            vb = Transform(vb, Matrix.RotateMatrixY((float)variables.rotateY));
            vb = Transform(vb, Matrix.RotateMatrixZ((float)variables.rotateZ));

            // Translate, should always be last!
            vb = Transform(vb, Matrix.TranslateMatrix(new Vector((float)variables.translateX, (float)variables.translateY, (float)variables.translateZ)));
            
            // Draw cube.
            vb = ViewingPipeline(vb);
            cube.Draw(e.Graphics, vb);
        }

        public static List<Vector> Transform(List<Vector> vb, Matrix transformmatrix)
        {
            List<Vector> result = new List<Vector>();

            vb.ForEach(x => result.Add(transformmatrix * x));

            return result;
        }

        public static List<Vector> ViewportTransformation(List<Vector> vb)
        {
            List<Vector> result = new List<Vector>();

            float delta_x = WIDTH / 2;
            float delta_y = HEIGHT / 2;

            foreach (Vector v in vb)
            {
                Vector v2 = new Vector(v.x + delta_x, delta_y - v.y);
                result.Add(v2);
            }

            return result;
        }

        public static List<Vector> ViewingPipeline(List<Vector> vb)
        {
            List<Vector> result = new List<Vector>();
            Form1 form = new Form1();
            Matrix viewMatrix = Matrix.ViewMatrix(variables.r, variables.theta, variables.phi);

            vb.ForEach(v =>
            {
                Vector vp = viewMatrix * v;
                vp = Matrix.ProjectionMatrix(variables.distance, vp) * vp;
                result.Add(vp);
            });

            return ViewportTransformation(result);
        }

        public static void Reset()
        {
            variables = new Variables();
        }

        public void UpdateLabels()
        {
            labelScale.Text = variables.scale.ToString();

            labelTranslateX.Text = variables.translateX.ToString();
            labelTranslateY.Text = variables.translateY.ToString();
            labelTranslateZ.Text = variables.translateZ.ToString();

            labelRotateX.Text = variables.rotateX.ToString();
            labelRotateY.Text = variables.rotateY.ToString();
            labelRotateZ.Text = variables.rotateZ.ToString();

            labelR.Text = variables.r.ToString();
            labelDistance.Text = variables.distance.ToString();
            labelPhi.Text = variables.phi.ToString();
            labelTheta.Text = variables.theta.ToString();

            labelPhase.Text = $"Phase {variables.phase}";
        }

        private void Form1_KeyDown(object sender, KeyEventArgs e)
        {
            switch (e.KeyCode)
            {
                case Keys.Escape:
                    Application.Exit();
                    break;

                case Keys.A:
                    if (timer.Enabled)
                    {
                        timer.Stop();
                    }
                    else
                    {
                        timer.Start();
                        variables.phase = 1;
                    }
                    break;

                // Reset all variables to default.
                case Keys.C:
                    Reset();
                    UpdateLabels();
                    break;

                // Change scale.
                case Keys.S when e.Shift:
                    variables.scale += 0.1f;
                    labelScale.Text = variables.scale.ToString();
                    break;

                case Keys.S:
                    variables.scale -= 0.1f;
                    labelScale.Text = variables.scale.ToString();
                    break;

                // Change translateX.
                case Keys.Right:
                    variables.translateX += 0.1;
                    labelTranslateX.Text = variables.translateX.ToString();
                    break;

                case Keys.Left:
                    variables.translateX -= 0.1;
                    labelTranslateX.Text = variables.translateX.ToString();
                    break;

                // Change translateY.
                case Keys.Down:
                    variables.translateY += 0.1;
                    labelTranslateY.Text = variables.translateY.ToString();
                    break;

                case Keys.Up:
                    variables.translateY -= 0.1;
                    labelTranslateY.Text = variables.translateY.ToString();
                    break;

                // Change translateZ.
                case Keys.PageDown:
                    variables.translateZ += 0.1;
                    labelTranslateZ.Text = variables.translateZ.ToString();
                    break;

                case Keys.PageUp:
                    variables.translateZ -= 0.1;
                    labelTranslateZ.Text = variables.translateZ.ToString();
                    break;

                // Change RotateX
                case Keys.X when e.Shift:
                    variables.rotateX++;
                    labelRotateX.Text = variables.rotateX.ToString();
                    break;

                case Keys.X:
                    variables.rotateX--;
                    labelRotateX.Text = variables.rotateX.ToString();
                    break;

                // Change RotateY
                case Keys.Y when e.Shift:
                    variables.rotateY++;
                    labelRotateY.Text = variables.rotateY.ToString();
                    break;

                case Keys.Y:
                    variables.rotateY--;
                    labelRotateY.Text = variables.rotateY.ToString();
                    break;

                // Change RotateZ
                case Keys.Z when e.Shift:
                    variables.rotateZ++;
                    labelRotateZ.Text = variables.rotateZ.ToString();
                    break;

                case Keys.Z:
                    variables.rotateZ--;
                    labelRotateZ.Text = variables.rotateZ.ToString();
                    break;

                // Change r
                case Keys.R when e.Shift:
                    variables.r++;
                    labelR.Text = variables.r.ToString();
                    break;

                case Keys.R:
                    variables.r--;
                    labelR.Text = variables.r.ToString();
                    break;

                // Change distance
                case Keys.D when e.Shift:
                    variables.distance++;
                    labelDistance.Text = variables.distance.ToString();
                    break;

                case Keys.D:
                    variables.distance--;
                    labelDistance.Text = variables.distance.ToString();
                    break;

                // Change phi
                case Keys.P when e.Shift:
                    variables.phi++;
                    labelPhi.Text = variables.phi.ToString();
                    break;

                case Keys.P:
                    variables.phi--;
                    labelPhi.Text = variables.phi.ToString();
                    break;

                // Change theta
                case Keys.T when e.Shift:
                    variables.theta++;
                    labelTheta.Text = variables.theta.ToString();
                    break;

                case Keys.T:
                    variables.theta--;
                    labelTheta.Text = variables.theta.ToString();
                    break;
            }
            this.Invalidate();
        }
    }
}