<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                 <StackLayout class="input-field">
                    <TextField class="input" hint="First Name" 
                        autocorrect="false" autocapitalizationType="none"
                        v-model="user.first_name" returnKeyType="next"
                        @returnPress="focusPassword" fontSize="18" />
                </StackLayout>
                 <StackLayout class="input-field">
                    <TextField class="input" hint="Last Name" 
                        autocorrect="false" autocapitalizationType="none"
                        v-model="user.last_name" returnKeyType="next"
                        @returnPress="focusPassword" fontSize="18" />
                </StackLayout>
                <StackLayout class="input-field">
                    <TextField class="input" hint="Email" keyboardType="email"
                        autocorrect="false" autocapitalizationType="none"
                        v-model="user.email" returnKeyType="next"
                        @returnPress="focusPassword" fontSize="18" />
                </StackLayout>

                <StackLayout class="input-field">
                    <TextField ref="password" class="input" hint="Password"
                        secure="true" v-model="user.password"
                        @returnPress="focusConfirmPassword" fontSize="18" />
                </StackLayout>
                <StackLayout class="input-field">
                    <TextField ref="password" class="input" hint="confirm Password"
                        secure="true" v-model="user.confirmpass"
                        @returnPress="focusConfirmPassword" fontSize="18" />
                </StackLayout>
                <Button text="Register" @tap="addUser"
                    class="btn btn-yellow m-t-20" />
                <Button text="login" @tap="login"
                    class="btn btn-Blue m-t-20" />
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
import Home from './Home';
import Login from "./Login";

    export default {
        components: {

        },
        data() {
            return {
                isLoggingIn: true,
                user: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    confirmpass:""
                }
            };
        },
        mounted(){
            this.$backendService.getaccess().then(result => {},error => {console.log(error);});
        },
        methods: {
            addUser(){
                if(this.user.first_name == "" || this.user.last_name == "" 
                || this.user.email == "" || this.user.password == "" || this.user.confirmpass == ""){
                alert({
                    title: "hi ",
                    message: "fill the data ya stupid",
                    okButtonText: "ok sir"
                });
            }
            if( this.user.password != this.user.confirmpass){
                 alert({
                    title: "hi ",
                    message: "confirm password doesn't match password",
                    okButtonText: "ok sir"
                });
            }
            else{
                 this.$backendService.regis(this.user).then(result => {
                        console.log(" ----1--- " + result);
                         alert({
                    title: "hi ",
                    message: "done",
                    okButtonText: "ok sir"
                });
                this.user.first_name = "";
                this.user.last_name = "";
                this.user.email = "";
                this.user.password = "";
                this.user.confirmpass = "";
                    },error => {
                        console.log(error);
                    });
            }
            },
            login() {
                
                this.$navigateTo(Login, { clearHistory: true });
                       
            },
        }
    };
</script>

<style scoped>
    .page {
        align-items: center;
        flex-direction: column;
        background: linear-gradient(to bottom, rgb(96, 96, 96), rgb(23, 23, 23));
    }

    .form {
        margin-left: 20;
        margin-right: 20;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }
    .input-field {
        margin-bottom: 10;
    }
    .input {
        padding-left: 10;
        padding-right: 10;
        height: 50;
        width: 100%;
        border-radius: 10;
        background: #fff;
    }
    .btn-yellow {
        height: 60;
        margin: 10 0 15 0;
        background-color: #f6e557;
        color: #000;
        font-size: 20;
        width: 100%;
        font-weight: 600;
    }
    .sign-up-label {
        horizontal-align: center;
        color: #f6e557;
        margin-bottom: 20;
    }

    .bold {
        color: #f6e557;
    }
</style>