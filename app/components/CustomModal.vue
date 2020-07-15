<template>
    <FlexboxLayout flexDirection="column" class="p-20 modal" backgroundColor="white">
        <StackLayout>
            <FlexboxLayout justifyContent="space-between" alignItems="center" padding="10" class="border-bottom">
                <Image class="cancel fa" src.decode="font://&#xf00d;" @tap="$modal.close()"></Image>
                <Label textWrap="true" text="Answer" color="#555" fontSize="22" fontWeight="bold"/>
                <Label textWrap="true" text="Submit" color="#c60043" fontSize="22" fontWeight="bold"/>
            </FlexboxLayout>
        </StackLayout>
        <StackLayout padding="10">
            <Label textWrap="true" text="What weird foocombinations do you really enjoy?" color="#555" fontSize="22" fontWeight="bold"/>
            <TextView hint="Write your question" v-model="textViewValue" />
        </StackLayout>
    </FlexboxLayout>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style>
.modal{
    width: 300;
    height: 500;
}
.cancel{
    color: #c60043;
    width: 16;
    font-size: 16;
}
TextView{
    border-bottom-width: 1;
    border-bottom-color: transparent;
}
</style>
