import * as THREE from '../../three.js-dev/src/Three.js';

    //添加画面和相机

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight ,0.1,1000);


    //添加图形渲染器、设置渲染框的大小并加入指定div中

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.querySelector('#outPut').appendChild(renderer.domElement)

    //创建几何形体，创建材质，创建网格填入形体和材质，最后加入画面

    var geometry = new THREE.BoxGeometry(8,8,8);
    var material = new THREE.MeshLambertMaterial({color:0x999955})
    var mesh = new THREE.Mesh(geometry,material);
    mesh.castShadow = true
    scene.add(mesh);

    //添加全局灯光

    var light = new THREE.AmbientLight( 0x404040 );
    scene.add( light );

    //添加坐标轴
    var axis = new THREE.AxesHelper(20);
    scene.add(axis)

    var plane = new THREE.PlaneGeometry(100,100);
    var planeMaterial = new THREE.MeshLambertMaterial( {color:0x9999ff} );
    var planeMesh = new THREE.Mesh(plane,planeMaterial);
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);

    // 生成投影效果：1设置产生阴影的光源，开启阴影开关（castshadow），并设置采样值；

    var spotlight = new THREE.SpotLight(0x888888,);
    spotlight.position.set(30,30,-20);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize = new THREE.Vector2(1024,1024);
    spotlight.shadow.camera.far = 130;
    spotlight.shadow.camera.near = 40;
    spotlight.penumbra  = 0.2;
    spotlight.decay = 2;
    scene.add(spotlight)

    //设置摄像机选项

    camera.position.z = 30;
    camera.position.x = 45;
    camera.position.y = 45;
    //固定了摄像机的焦点
    camera.lookAt(scene.position);

    //设置物体位置
    mesh.position.y = 4;

    planeMesh.position.set(15,0,0);
    planeMesh.rotation.x = -Math.PI*0.5;
    // 平面存在正反面，反面朝向摄像机是不会显示的

    //渲染器渲染网格
    renderer.render(scene,camera);