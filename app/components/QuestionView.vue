<template >
    <Page >
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
                        

                    <StackLayout >
                            <Label color="Black" fontSize="25" marginLeft="5" marginTop="10" marginRight="5"  textWrap="true" 
                            :text="ques.title"  fontWeight="bold" /> 
                        <Label textWrap="true" color="Black" marginTop="5" fontStyle="italic" marginLeft="190" >
                            <FormattedString>
                                <Span text="By: " />
                                <Span :text="ques.name" style="color: red" />
                            </FormattedString>
                        </Label>
                        <Label textWrap="true" color="Black" marginTop="5" fontStyle="italic" marginLeft="200" >
                            <FormattedString>
                                <Span text="Asked on: " />
                                <Span :text="ques.date" style="color: red" />
                            </FormattedString>
                        </Label>
                         
                        
                        <Label color="Black" fontSize="14" marginTop="15" marginLeft="5" marginRight="5"  textWrap="true" :text="ques.content" 
                        /> 
                <Button color="White" text="Answer" @tap="Answer" backgroundColor="Green" marginTop="20" fontSize="15"  style="width:100;height:40;border-width:1;border-color:White;border-radius:10"/>

                    <StackLayout class=""></StackLayout>

                   
                     <StackLayout orientation="vertical" >
                    <ListView for="item in answers"  @itemTap="onItemTap">
                        <v-template>
                    <StackLayout   class="card"  elevation="40" ios:shadowRadius="3">
                        <FlexboxLayout justifyContent="center" alignItems="center" padding="10">
                                <StackLayout width="20%">
                                <Image class="round-img" src="~/assets/images/google.png" />
                            </StackLayout>
                            <StackLayout width="65%" marginLeft="10">
                                <Label :text="item.owner.first_name+' '+item.owner.last_name"
                                 fontSize="22" fontWeight="bold"/>
                                <Label :text="item.created_on" fontSize="18" color="#ccc"/>
                            </StackLayout>
                                <StackLayout width="8%">
                                <Image src.decode="font://&#xf06a;" class="fa" color="#c60043"></Image>
                            </StackLayout>
                        </FlexboxLayout>
                        
                        <StackLayout padding="10 15" class="border-bottom">
                            <Label textWrap="true" :text="item.answercont" color="#555" fontSize="22" fontWeight="bold"/>
                            <Label text="30 Likes | 10 Answers" fontSize="18" marginTop="5" color="#ccc"/>
                        </StackLayout>
                        <FlexboxLayout>
                            <Button width="50%" class="btn btn-active btn-like">
                                <FormattedString>
                                    <Span text="LIKE" fontSize="18" fontWeight="bold"/>
                                </FormattedString>
                            </Button>
                            <Button width="50%" class="btn btn-active btn-answer">
                                <FormattedString>
                                    <Span text="ANSWER" fontSize="18" fontWeight="bold"/>
                                </FormattedString>
                            </Button>
                        </FlexboxLayout>
                    </StackLayout>
                    </v-template>
                     </ListView>
                </StackLayout>
            
            </StackLayout>
        
        </ScrollView>
        
    </Page>
</template>
<script>
    import Home from "./Home";
    import AnswerQ from "./AnswerQ";



const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
import RadListView from 'nativescript-ui-listview/vue';
const platformModule = require("tns-core-modules/platform");
    export default {
         data() {
            return {
                ques: {
                    name:"",
                    date:"",
                    title:"",
                    content:"",
                    id:""
                },
                id: global.selected,
                answers: new ObservableArray()
            };
        },
        mounted(){
            this.$backendService.getQdetails().then(result=>{
                // console.log("7amada");
                console.log(result);
                this.ques.title = result.title;
                this.ques.content = result.content;
                this.ques.name = result.owner.first_name +" "+ result.owner.last_name;
                var str   = result.created_on;
                var stringArray = str.split(" ");
                this.ques.date = stringArray[0];
                // console.log(this.ques);
            },error=>{
                console.log(error);
            });
             this.$backendService.getAnswer().then(result=>{
                console.log(result);
                 this.answers =  new ObservableArray(result);
                // console.log(this.ques);
            },error=>{
                console.log(error);
            });
        },
        methods: {
            onPullToRefreshInitiated ({ object }) {
            console.log('Pulling...');
            this.$nextTick(() => {
                this.$backendService
                    .Answers()
                    .then(result => {
                        // console.log(" ----0---- " + result);
                       this.answers =  new ObservableArray(result);
                    },error => {
                        console.log(error);
                    });
                object.notifyPullToRefreshFinished();
            });
            },
            Answer(){
                this.$navigateTo(AnswerQ, {
                    clearHistory: true
                });
            },
            Back() {
               this.$navigateTo(Home, {
                    clearHistory: true
                });
            }
        },

       
    };
</script>