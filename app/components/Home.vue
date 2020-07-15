<template>
    <Page>
        <ActionBar androidElevation="12">
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="center">
                <Label :text="cutrrentTitle" fontSize="22" fontWeight="bold"></Label>
            </StackLayout>
        </ActionBar>
        <BottomNavigation selectedIndex="0" class="bottom-nav">
        <TabStrip>
            <TabStripItem @tap="handelNavigation(1)">
                <Label text="Feed"></Label>
                <Image src.decode="font://&#xf09e;" class="fa"></Image>
            </TabStripItem>
            <TabStripItem @tap="handelNavigation(2)">
                <Label text="Ask Question"></Label>
                <Image src.decode="font://&#xf059;" class="fa"></Image>
            </TabStripItem>
            <TabStripItem @tap="handelNavigation(3)">
                <Label text="Notification"></Label>
                <Image src.decode="font://&#xf0f3;" class="fa"></Image>
            </TabStripItem>
                <TabStripItem @tap="handelNavigation(4)">
                <Label text="Profile"></Label>
                <Image src.decode="font://&#xf2bd;" class="fa"></Image>
            </TabStripItem>
        </TabStrip>

        <TabContentItem class="first-tabcontent" pullToRefresh="true" @pullToRefreshInitiated="onPullToRefreshInitiated">
            <ScrollView orientation="vertical">
                <StackLayout orientation="vertical" >
                    <ListView for="item in listofdata"  @itemTap="onItemTap">
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
                            <Label textWrap="true" :text="item.content" color="#555" fontSize="22" fontWeight="bold"/>
                            <Label text="30 Likes | 10 Answers" fontSize="18" marginTop="5" color="#ccc"/>
                        </StackLayout>
                        <FlexboxLayout>
                            <Button width="50%" class="btn btn-active btn-like">
                                <FormattedString>
                                    <Span text="LIKE" fontSize="18" fontWeight="bold"/>
                                </FormattedString>
                            </Button>
                            <Button width="50%" class="btn btn-active btn-answer" @tap="showModal">
                                <FormattedString>
                                    <Span text="ANSWER" fontSize="18" fontWeight="bold"/>
                                </FormattedString>
                            </Button>
                        </FlexboxLayout>
                    </StackLayout>
                    </v-template>
                     </ListView>
                </StackLayout>
               
            </ScrollView>
        </TabContentItem>

        <TabContentItem class="second-tabcontent">
            <FlexboxLayout flexDirection="column">
                <StackLayout>
                    <FlexboxLayout justifyContent="flex-end" alignItems="center" padding="10" class="border-bottom">
                        <Button width="30%" class="btn btn-active btn-add" @tap="askQuestions">
                            <FormattedString>
                                <Span text="ADD" fontWeight="bold"/>
                            </FormattedString>
                        </Button>
                    </FlexboxLayout>
                </StackLayout>
                <TextView   hint="Write your question title" v-model="ques.title" />
                <TextView width="200px" hint="Write your question content" v-model="ques.content" />

            </FlexboxLayout>
        </TabContentItem>

        <TabContentItem class="third-tabcontent">
            <GridLayout>
                <Label text="Search Page" horizontalAlignment="center"
                    verticalAlignment="middle" />
            </GridLayout>
        </TabContentItem>

        <TabContentItem class="fourth-tabcontent">
            <FlexboxLayout>
                
            </FlexboxLayout>
            <AbsoluteLayout>
                <StackLayout class="top-content" width="100%" height="35%"></StackLayout>
                <StackLayout left="140" top="55" id="check" elevation="50">
                    <Image  class="round-img" src="~/assets/images/google.png" />
                </StackLayout>
                <StackLayout left="25" top="80" width="80%" class="profile-card" elevation="40" ios:shadowRadius="3">
                    <FlexboxLayout justifyContent="flex-end">
                        <Image class="pencil fa" src.decode="font://&#xf040;"></Image>
                    </FlexboxLayout>
                    <FlexboxLayout padding="30 15" flexDirection="column" alignItems="center">
                       <Label :text="fn" fontSize="22" fontWeight="bold"/>
                        <Label :text="mail" fontSize="18" color="#666"/>
                    </FlexboxLayout>
                    <FlexboxLayout padding="0 15 20 15" justifyContent="space-between">
                        <StackLayout>
                            <Label textAlignment="center" textWrap="true" text="302" color="#555" fontSize="18" fontWeight="bold"/>
                            <Label text="POSTS" fontSize="14" marginTop="5" color="#ccc"/>
                        </StackLayout>
                        <StackLayout>
                            <Label textAlignment="center" textWrap="true" text="10.3k" color="#555" fontSize="18" fontWeight="bold"/>
                            <Label text="FOLLOWERS" fontSize="14" marginTop="5" color="#ccc"/>
                        </StackLayout>
                        <StackLayout>
                            <Label textAlignment="center" textWrap="true" text="120" color="#555" fontSize="18" fontWeight="bold"/>
                            <Label text="FOLLOWING" fontSize="14" marginTop="5" color="#ccc"/>
                        </StackLayout>
                    </FlexboxLayout>
                </StackLayout>
                <StackLayout top="370" padding="0 15 20 15" width="100%">
                    <Label textAlignment="left" textWrap="true" text="Note" color="#555" fontSize="20" fontWeight="bold"/>
                    <FlexboxLayout flexDirection="column">
                        <Button text="ACTIVITY" class="btn bg-btn orange-bg" />
                        <Button text="LOG OUT" class="btn bg-btn gray-bg" @tap="logout" />
                    </FlexboxLayout>
                </StackLayout>
            </AbsoluteLayout>
        </TabContentItem>
        
    </BottomNavigation>
    </Page>
</template>

<script >
import CustomModal from "./CustomModal";
import Login from "./Login";
import QuestionView from "./QuestionView";


const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
import RadListView from 'nativescript-ui-listview/vue';
const platformModule = require("tns-core-modules/platform");
export default {
    data() {
        return {
            textViewValue: "",
            cutrrentTitle: "Feed",
           
            ques:{
                title:"",
                content:""
            },
            listofdata: new ObservableArray(),
            
            fn:global.UserData.user.first_name +" "+ global.UserData.user.last_name,
            mail:global.UserData.user.email

        }
    },
    mounted(){
        console.log(global.UserData.user);
            this.$backendService
                    .getResults()
                    .then(result => {
                       this.listofdata =  new ObservableArray(result);
                        console.log("----"+result[0].owner.id);

                    },error => {
                        console.log(error);
                    });
        },
    methods: {
        onPullToRefreshInitiated ({ object }) {
            console.log('Pulling...');
            this.$nextTick(() => {
                this.$backendService
                    .getResults()
                    .then(result => {
                        console.log(" ----0---- " + result);
                       this.listofdata =  new ObservableArray(result);
                    },error => {
                        console.log(error);
                    });
                object.notifyPullToRefreshFinished();
            });
            }, 
        onItemTap: function({ item }) {
            console.log(item.id);
            global.selectedQ = item.id;
            this.$navigateTo(QuestionView, {
                    clearHistory: true
                });

            },
            stripHtml(str)
            {
                if ((str===null) || (str===''))
                    return false;
                else
                str = str.toString();
                return str.replace(/<[^>]*>/g, '');
            },
        askQuestions(){
            if(this.ques.title == "" || this.ques.content == ""){
                alert({
                    title: "hi ",
                    message: "fill the data ya stupid",
                    okButtonText: "ok sir"
                });
            }
            else{
this.$backendService
                    .postQusetion(this.ques)
                    .then(result => {
                        console.log(" ---- " + result);
                          alert({
                    title: "congrats",
                    message: "you have posted a question ya stupid",
                    okButtonText: "ok sir"
                });
                this.ques.title = "";
                this.ques.content = "";
                    },error => {
                        console.log(error);
                    });
            }
        },
        showModal() {
            this.$showModal(CustomModal);
        },
        handelNavigation(index){
            if(index == 1){
                this.cutrrentTitle = "Feed";
            }
            else if(index == 2){
                this.cutrrentTitle = "Questions";
            }
            else if(index == 3){
                this.cutrrentTitle = "Notification";
            }
            else if(index == 4){
                this.cutrrentTitle = "Profile";
            }
        },
        submit() {
            if (!this.user.email || !this.user.password) {
                this.alert(
                    "Please provide both an email address and password."
                );
                return;
            }
            if (this.isLoggingIn) {
                this.login();
            } else {
                this.register();
            }
        },

        login() {
            userService
            .login(this.user)
            .then(() => {
                this.$navigateTo(HomePage);
            })
            .catch(() => {
                this.alert(
                    "Unfortunately we could not find your account."
                    );
            });
        },
        logout() {
                this.$backendService.logout();
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            },
    }
}
</script>

<style scoped>
/* top bar design */
    ActionBar {
        background: linear-gradient(to bottom, rgb(248, 248, 248), rgb(248, 248, 248));
        color: #000;
        text-align: center;
    }
    ActionBar,
    TabStrip {
        background: linear-gradient(to bottom, rgb(248, 248, 248), rgb(248, 248, 248));
    }

    TabStripItem {
        color: #96959a;
    }

    TabStripItem:active {
        color: #c60043;
    }

    TabStripItem Label {
        font-size: 14;
    }

    TabStripItem Image {
        font-size: 36;
    }
/* top bar design */

/* bottom bar design  */
    .first-tabcontent{
            background-color: #eeeeee;
    }
    .second-tabcontent {
        background: #fff;
    }
/* bottom bar design  */

    .round-img{
        width:130px; 
        height:130px; 
        border-radius:50%;
    }
    .card {
        background-color: #fff;
        color: #4d4d4d;
        border-radius: 20;
        margin: 15px;
    }
    .border-bottom {
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: #dedede;
        border-left-color: transparent;

        border-top-width: 0;
        border-right-width: 0;
        border-bottom-width: 1;
        border-left-width: 0;
    }
    .btn-like{
        border-color: #dedede;
        border-bottom-left-radius: 20;
        border-top-width: 0;
        border-right-width: 1;
        border-bottom-width: 0;
        border-left-width: 0;
        z-index: 0; 
    }
    .btn-answer{
        border-color: #dedede;
        border-bottom-right-radius: 20;
        border-top-width: 0;
        border-right-width: 0;
        border-bottom-width: 0;
        border-left-width: 1;
        z-index: 0; 
    }
    .btn-add{
        color: #c60043;
        background-color: #f5e2e8;
        border-radius: 50%;
        font-size: 16;
        z-index: 0; 
    }
    TextView{
        border-bottom-width: 1;
        border-bottom-color: blueviolet;
    }
    .top-content{
        background: linear-gradient(to right, rgb(116, 128, 200), rgb(67, 84, 183));
    }
    .profile-card{
        background-color: #fff;
        color: #4d4d4d;
        border-radius: 20;
        margin: 15px;
        z-index: 50;
    }
    .pencil{
        color: #c60043;
        width: 20;
        margin: 5 10 0 0;
        height: 25;
    }
    .bg-btn{
        height: 60;
        margin: 10 15 0 15;
        color: #fff;
        font-size: 20;
        width: 100%;
        font-weight: 600;
    }
    .orange-bg{
        background: #de9320;
    }
    .gray-bg{
        background: #607d8b;
    }
    #check{
        z-index: 9999;
    }
    
</style>
