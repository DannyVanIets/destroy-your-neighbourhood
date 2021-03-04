using MatrixTransformations;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace NUnitTestsMatrixTransformations
{
    public class MatrixTests
    {
        [TestCase(0, 0)]
        [TestCase(5, 2)]
        public void Test_Vector_Constructor(int m11, int m12, int m21, int m22)
        {
            // Arrange
            Matrix matrix = new Matrix(m11, m12, m21, m22);

            // Act


            // Assert
            Assert.AreEqual(x, v.x);
            Assert.AreEqual(y, v.y);
            Assert.AreEqual(z, v.z);
            Assert.AreEqual(w, v.w);
        }
    }
}
