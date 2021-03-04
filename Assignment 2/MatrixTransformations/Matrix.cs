using System;
using System.Text;

namespace MatrixTransformations
{
    public class Matrix
    {
        float[,] mat = new float[4, 4];

        public Matrix()
        {
            /*  Should look like this:
             *  1, 0, 0, 0
             *  0, 1, 0, 0
             *  0, 0, 1, 0
             *  0, 0, 0, 1
             */
            mat = new Matrix(
                1, 0, 
                0, 1
            ).mat;
        }

        public Matrix(float m11, float m12,
                      float m21, float m22)
        {
            /*  Should look like this:
             *  m11, m12, 0, 0
             *  m21, m22, 0, 0
             *  0,   0,   0, 0
             *  0,   0,   0, 0
             */ 
            mat[0, 0] = m11; mat[0, 1] = m12; mat[0, 2] = 0; mat[0, 3] = 0;
            mat[1, 0] = m21; mat[1, 1] = m22; mat[1, 2] = 0; mat[1, 3] = 0;
            mat[2, 0] = 0;   mat[2, 1] = 0;   mat[2, 2] = 1; mat[2, 3] = 0;
            mat[3, 0] = 0;   mat[3, 1] = 0;   mat[3, 2] = 0; mat[3, 3] = 1;
        }

        public Matrix(Vector v)
        {
            /*  Should look like this:
             *  v.x, 0, 0, 0
             *  v.y, 1, 0, 0
             *  v.z, 0, 1, 0
             *  0,   0, 0, 1
             */
            mat[0, 0] = v.x;
            mat[1, 0] = v.y;
            mat[2, 0] = v.z;
        }

        public static Matrix ZeroMatrix()
        {
            /*  Should look like this:
             *  0, 0, 0, 0
             *  0, 0, 0, 0
             *  0, 0, 0, 0
             *  0, 0, 0, 0
             */
            Matrix matrix = new Matrix();
            matrix.mat[0, 0] = 0; matrix.mat[0, 1] = 0; matrix.mat[0, 2] = 0; matrix.mat[0, 3] = 0;
            matrix.mat[1, 0] = 0; matrix.mat[1, 1] = 0; matrix.mat[1, 2] = 0; matrix.mat[1, 3] = 0;
            matrix.mat[2, 0] = 0; matrix.mat[2, 1] = 0; matrix.mat[2, 2] = 0; matrix.mat[2, 3] = 0;
            matrix.mat[3, 0] = 0; matrix.mat[3, 1] = 0; matrix.mat[3, 2] = 0; matrix.mat[3, 3] = 0;
            return matrix;
        }

        public static Matrix operator +(Matrix m1, Matrix m2)
        {
            Matrix matrix = new Matrix();
            for (int i = 0; i < m1.mat.GetLength(0); i++)
            {
                for (int j = 0; j < m1.mat.GetLength(1); j++)
                {
                    matrix.mat[i, j] = m1.mat[i, j] + m2.mat[i, j];
                }
            }
            return matrix;
        }

        public static Matrix operator -(Matrix m1, Matrix m2)
        {
            Matrix matrix = new Matrix();
            for (int i = 0; i < m1.mat.GetLength(0); i++)
            {
                for (int j = 0; j < m1.mat.GetLength(1); j++)
                {
                    matrix.mat[i, j] = m1.mat[i, j] - m2.mat[i, j];
                }
            }
            return matrix;
        }

        public static Matrix operator *(Matrix m1, float f)
        {
            Matrix matrix = new Matrix();
            for (int i = 0; i < m1.mat.GetLength(0); i++)
            {
                for (int j = 0; j < m1.mat.GetLength(1); j++)
                {
                    matrix.mat[i, j] = m1.mat[i, j] * f;
                }
            }
            return matrix;
        }

        public static Matrix operator *(float f, Matrix m1)
        {
            Matrix matrix = new Matrix();
            for (int i = 0; i < m1.mat.GetLength(0); i++)
            {
                for (int j = 0; j < m1.mat.GetLength(1); j++)
                {
                    matrix.mat[i, j] = m1.mat[i, j] * f;
                }
            }
            return matrix;
        }

        public static Matrix operator *(Matrix m1, Matrix m2)
        {
            Matrix matrix = ZeroMatrix();
            int columns = m1.mat.GetLength(0);
            int rows = m1.mat.GetLength(1);

            for (int i = 0; i < columns; i++)
            {
                for (int j = 0; j < rows; j++)
                {
                    for (int n = 0; n < rows; n++)
                    {
                        matrix.mat[i, j] += m1.mat[i, n] * m2.mat[n, j];
                    }
                }
            }
            return matrix;
        }

        public static Vector operator *(Matrix m1, Vector v)
        {
            return new Vector(
                m1.mat[0, 0] * v.x + m1.mat[0, 1] * v.y + m1.mat[0, 2] * v.z + m1.mat[0, 3] * v.w,
                m1.mat[1, 0] * v.x + m1.mat[1, 1] * v.y + m1.mat[1, 2] * v.z + m1.mat[1, 3] * v.w,
                m1.mat[2, 0] * v.x + m1.mat[2, 1] * v.y + m1.mat[2, 2] * v.z + m1.mat[2, 3] * v.w,
                m1.mat[3, 0] * v.x + m1.mat[3, 1] * v.y + m1.mat[3, 2] * v.z + m1.mat[3, 3] * v.w
            );
        }

        public static Matrix Identity()
        {
            /*  Should look like this:
             *  1, 0, 0, 0
             *  0, 1, 0, 0
             *  0, 0, 1, 0
             *  0, 0, 0, 1
             */
            return new Matrix();
        }

        public Vector ToVector()
        {
            /*  Should look like this:
             *  mat[0, 0],
             *  mat[1, 0],
             *  mat[2, 0],
             *  mat[3, 0],
             */
            Vector vector = new Vector
            {
                x = mat[0, 0],
                y = mat[1, 0],
                z = mat[2, 0],
                w = mat[3, 0]
            };
            return vector;
        }

        public override string ToString()
        {
            string toString = "";
            for (int i = 0; i < mat.GetLength(0); i++)
            {
                for (int j = 0; j < mat.GetLength(1); j++)
                {
                    toString += mat[i, j];

                    if (i != mat.GetLength(1) - 1 || j != mat.GetLength(1) - 1)
                    {
                        toString += ", ";
                    }
                }
            }
            return toString;
        }

        // For lecture 3
        public static Matrix ScaleMatrix(float s)
        {
            // Scale the matrix, so that the cube/square becomes bigger/smaller.
            /*  Should look like this:
             *  s, 0, 0, 0
             *  0, s, 0, 0
             *  0, 0, s, 0
             *  0, 0, 0, 1
             */
            Matrix m = new Matrix();
            m.mat[0, 0] = s;
            m.mat[1, 1] = s;
            m.mat[2, 2] = s;
            return m;
        }

        public static Matrix RotateMatrix(float degrees)
        {
            /*  Should look like this:
             *  cos, -sin, 0, 0
             *  sin,  cos, 0, 0
             *  0,    0,   1, 0
             *  0,    0,   0, 1
             */
            // Turn degrees into radians, radians is used by cos and sin.
            double radians = degrees * Math.PI / 180;
            float cos = (float)Math.Cos(radians);
            float sin = (float)Math.Sin(radians);

            Matrix rotatedMatrix = new Matrix(
                cos, -sin,
                sin, cos
            );
            return rotatedMatrix;
        }

        public static Matrix TranslateMatrix(Vector t)
        {
            /*  Should look like this:
             *  1, 0, 0, t.x
             *  0, 1, 0, t.y
             *  0, 0, 1, t.z
             *  0, 0, 0, t.w
             */
            Matrix matrix = new Matrix();

            matrix.mat[0,3] += t.x;
            matrix.mat[1,3] += t.y;
            matrix.mat[2,3] += t.z;
            matrix.mat[3,3] += t.w;

            return matrix;
        }

        // Lecture 4
        public static Matrix RotateMatrixZ(float degrees)
        {
            return RotateMatrix(degrees);
        }

        public static Matrix RotateMatrixX(float degrees)
        {
            /*  Should look like this:
             *  1, 0,    0,   0
             *  0, cos, -sin, 0
             *  0, sin,  cos, 0
             *  0, 0,    0,   1
             */
            // Turn degrees into radians, radians is used by cos and sin.
            double radians = degrees * Math.PI / 180;
            float cos = (float)Math.Cos(radians);
            float sin = (float)Math.Sin(radians);

            Matrix rotatedMatrix = new Matrix();
            rotatedMatrix.mat[1,1] = cos; rotatedMatrix.mat[1, 2] = -sin;
            rotatedMatrix.mat[2,1] = sin; rotatedMatrix.mat[2, 2] = cos;
            return rotatedMatrix;
        }

        public static Matrix RotateMatrixY(float degrees)
        {
            /*  Should look like this:
             *   cos, 0, sin, 0
             *   0,   0, 0,   0
             *  -sin, 0, cos, 0
             *   0,   0, 0,   0
             */
            // Turn degrees into radians, radians is used by cos and sin.
            double radians = degrees * Math.PI / 180;
            float cos = (float)Math.Cos(radians);
            float sin = (float)Math.Sin(radians);

            Matrix rotatedMatrix = new Matrix();
            rotatedMatrix.mat[0, 0] = cos; rotatedMatrix.mat[0, 2] = sin;
            rotatedMatrix.mat[2, 0] = -sin; rotatedMatrix.mat[2, 2] = cos;
            return rotatedMatrix;
        }

        public static Matrix ViewMatrix(float r, float theta, float phi)
        {
            /*  Should look like this:
             *  -sinThetha, cosThetha, 0,                  0,       0
             *  -cosThetha * cosPhi,  -cosPhi * sinThetha, sinPhi,  0
             *  cosThetha * sinPhi,    sinThetha * sinPhi, cosPhi, -r
             *  0,                     0,                  0,       1
             */
            // Phi looks like this: φ.
            // Theta looks like this: θ.
            Matrix viewMatrix = new Matrix();

            float radiansTheta = theta * (float)Math.PI / 180;
            float radiansPhi = phi * (float)Math.PI / 180;

            float cosThetha = (float)Math.Cos(radiansTheta);
            float sinThetha = (float)Math.Sin(radiansTheta);

            float cosPhi = (float)Math.Cos(radiansPhi);
            float sinPhi = (float)Math.Sin(radiansPhi);

            viewMatrix.mat[0, 0] = -sinThetha;          viewMatrix.mat[0, 1] = cosThetha;
            viewMatrix.mat[1, 0] = -cosThetha * cosPhi; viewMatrix.mat[1, 1] = -cosPhi * sinThetha; viewMatrix.mat[1, 2] = sinPhi;
            viewMatrix.mat[2, 0] = cosThetha * sinPhi;  viewMatrix.mat[2, 1] = sinThetha * sinPhi;  viewMatrix.mat[2, 2] = cosPhi; viewMatrix.mat[2, 3] = -r;

            return viewMatrix;
        }

        public static Matrix ProjectionMatrix(float distance, Vector vector)
        {
            /*  Should look like this:
             *  distance / vector.z, 0,                   0, 0
             *  0,                   distance / vector.z, 0, 0
             *  0,                   0,                   0, 0
             *  0,                   0,                   0, 0
             */
            float projection = distance / vector.z;
            float[,] projMat = new float[4, 4];

            Matrix projMatrix = new Matrix
            {
                mat = projMat
            };

            projMatrix.mat[0, 0] = -projection;
            projMatrix.mat[1, 1] = -projection;

            return projMatrix;
        }

        public static Matrix CameraMatrix(Vector vector)
        {
            /*  Should look like this:
             *  1, 0, 0, vector.x
             *  0, 1, 0, vector.y
             *  0, 0, 1, vector.z
             *  0, 0, 0, 1
             */
            // Insert the camera positions into a matrix.
            Matrix projMatrix = new Matrix();

            projMatrix.mat[0, 3] = vector.x;
            projMatrix.mat[1, 3] = vector.y;
            projMatrix.mat[2, 3] = vector.z;

            return projMatrix;
        }
    }
}