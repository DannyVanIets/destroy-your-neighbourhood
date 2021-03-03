class Movement {
    constructor() {

    }

    AddPointerEvents(controls, scene){
        // Add events for the movement.
        // First event is used to make sure you have clicked on the screen before you can walk.
        document.addEventListener( 'click', function () {
            controls.lock();
        } );

        scene.add( controls.getObject() );

        // onKeyDown sets the right variable to true once you press in a key.
        const onKeyDown = function ( event ) {

            switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = true;
                    break;

                case 'ArrowQ':
                case 'KeyQ':
                    moveUp = true;
                    break;

                case 'ArrowE':
                case 'KeyE':
                    moveDown = true;
                    break;
            }

        };

        // onKeyUp sets the right variable to false once you no longer press in the key.
        const onKeyUp = function ( event ) {

            switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = false;
                    break;

                case 'KeyQ':
                    moveUp = false;
                    break;

                case 'KeyE':
                    moveDown = false;
                    break;
            }
        };

        document.addEventListener( 'keydown', onKeyDown );
        document.addEventListener( 'keyup', onKeyUp );
    }

    CalculateMovement(time, prevTime, velocity, direction, controls){
        // This function is used to calculate which direction with which velocity the camera should go to.
        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= velocity.y * 10.0 * delta;

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.y = Number( moveDown ) - Number( moveUp );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 200.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 200.0 * delta;
        if ( moveUp || moveDown ) velocity.y -= direction.y * 200.0 * delta;

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

        let positionY = controls.getObject().position.y + velocity.y * delta;

        if(positionY > 1){
            controls.getObject().position.y = positionY;
        }
    }
}