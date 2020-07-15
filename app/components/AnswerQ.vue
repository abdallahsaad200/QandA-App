<template>
    <Page>
        <ActionBar padding="15">
            <GridLayout width="94%">
                <StackLayout orientation="horizontal"  horizontalAlignment="left" >
 
               
                    <!--<Image src="~/images/logo.png" width="25" height="25" verticalAlignment="center" marginRight="10"/>-->
                    <Label text="Question" fontSize="20" verticalAlignment="center" marginLeft="0" />

                </StackLayout>
                   <StackLayout orientation="horizontal" horizontalAlignment="right" >
                <Button color="Blue" text="Back" @tap="Back"  style="width:40;height:30;border-width:1;border-color:Blue;border-radius:10" />
              </StackLayout>
            </GridLayout>
           </ActionBar>
        <ScrollView>
            <StackLayout class="home-panel">
                <!--Add your page content here-->
                <TextField v-model="answercont" textWrap="true" hint="Enter your answer here ..." style="height:200;border-width:1;border-color:Blue;border-radius:10" />
                <Button color="Blue" text="Submit" @tap="Submit"  marginTop="20" style="width:100;height:40;border-width:1;border-color:Blue;border-radius:10" />

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import QuestionView from "./QuestionView";

export default {
    data() {
        return {
            answercont: "",

        };
    },
    methods: {
        Submit(){
            if(this.answercont == "" ){
                          alert({
                            title: "hi",
                            message: "fill the answer ya stupid",
                            okButtonText: "ok"
                            });
                }
                else{
                 this.$backendService
                    .postAnswer(this.answercont)
                    .then(result => {
                        console.log("done"+ result)
                        // alert("Done");
                     alert({
                        title: "hi",
                        message: "your answer added successfully ya stupid",
                        okButtonText: "ok"
                        });

                        this.answercont = "";
                    },error => {
                        console.log(error);
                    });
                }
        },

         Back() {
               this.$navigateTo(QuestionView, {
                    clearHistory: true
                });
            }
    },
}
</script>

<style scoped>
.home-panel {
    vertical-align: center;
    font-size: 20;
    margin: 15;
}

.description-label {
    margin-bottom: 15;
}
</style>
