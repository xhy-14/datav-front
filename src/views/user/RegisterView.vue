<template>
    <el-container style="background-image: url(../../assets/images/homeBg.png);height: 98vh;">
        <el-main style="display: flex; justify-content: center;align-items: center;">
            <div class="input">
                <div class="box">
                    <div>
                        <img src="@/assets/images/logo.jpg" />
                    </div>
                </div>
                <div class="box">
                    <div class="font">注册</div>
                    <register-template> </register-template>
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

body {
    background-image: url(@/assets/images/homeBg.png) !important;
    background-size: cover;
    width: 100vw;
    height: 100vh;
}
</style>