<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
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

                <Button text="LogIn" @tap="login"
                    class="btn btn-yellow m-t-20" />
                <Label class="login-label sign-up-label" @tap="register">
                    <Span text="Create new account? Click here" class="bold" @tap="register" />
                </Label>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
import Home from './Home';
import register from './register';

    export default {
        components: {

        },
        data() {
            return {
                isLoggingIn: true,
                user: {
                    email: "test@t.com",
                    password: "123",
                    confirmPassword: "123"
                }
            };
        },
        methods: {
            login() {
                var result = this.$backendService
                    .login(this.user)
                    .then(result => {
                        // console.log(" ---- " + result);
                        if(result)
                        {

                            this.isLoggingIn = true;
                            this.processing = false;
                            this.$navigateTo(Home, { clearHistory: true });
                        // console.log("test");

                        }  
                        else{
                            this.alert("Wrong Username or Password");
                            this.processing = false;
                        }   
                    },error => {
                        console.log(error);
                    });
            },
            register(){
                this.$navigateTo(register, { clearHistory: true });
            }
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