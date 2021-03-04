using MatrixTransformations;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace NUnitTestsMatrixTransformations
{
    public class MatrixTests
    {
        [TestCase(0, 0, 0, 0)]
        [TestCase(5, 4, 3, 2)]
        [TestCase(-5, 8, 100, -33)]
        public void Test_Matrix_Constructor(int m11, int m12, int m21, int m22)
        {
            // Arrange
            Matrix matrix = new Matrix(m11, m12, m21, m22);

            // Act


            // Assert
            Assert.AreEqual(m11, matrix.mat[0, 0]);
            Assert.AreEqual(m12, matrix.mat[0, 1]);
            Assert.AreEqual(m21, matrix.mat[1, 0]);
            Assert.AreEqual(m22, matrix.mat[1, 1]);
        }

        [TestCase(0, 0, 0)]
        [TestCase(5, 4, 3)]
        [TestCase(-5, 8, 100)]
        public void Test_Matrix_Constructor_Vector(int x, int y, int z)
        {
            // Arrange
            Matrix matrix = new Matrix(new Vector(x, y, z));

            // Act


            // Assert
            Assert.AreEqual(x, matrix.mat[0, 0]);
            Assert.AreEqual(y, matrix.mat[1, 0]);
            Assert.AreEqual(z, matrix.mat[2, 0]);
        }

        [TestCase(0, 0, 0)]
        [TestCase(5, 4, 3)]
        [TestCase(-5, 8, 100)]
        public void Test_Matrix_Plus(int x, int y, int z)
        {
            // Arrange
            Matrix matrix = new Matrix(new Vector(x, y, z));

            // Act


            // Assert
            Assert.AreEqual(x, matrix.mat[0, 0]);
            Assert.AreEqual(y, matrix.mat[1, 0]);
            Assert.AreEqual(z, matrix.mat[2, 0]);
        }
    }
}
