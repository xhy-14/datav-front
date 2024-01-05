<template>
    <el-container class="mainBackground" >
        <el-main style="display: flex; justify-content: center;align-items: center;">
            <div class="input">
                <div class="box">
                    <div>
                        <img src="@/assets/images/logo.jpg" />
                    </div>
                </div>
                <div class="box">
                    <div class="font">登录</div>
                    <login-template> </login-template>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<style>
.input {

    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 66%;
    height: 50vh;
    align-items: center;
    background-color: rgb(253, 253, 253);
}

.box {
    width: 45%;
    margin: 10px auto;
    /* border: 1px solid; */


}

.font {
    font-size: 55px;
    margin-bottom: 20px;
    margin-left: 20px;

}

.mainBackground {
    background-image: url(@/assets/images/loginBg.png) ;
    background-size: cover;
    width: 100vw;
    height: 100vh;
}
</style>