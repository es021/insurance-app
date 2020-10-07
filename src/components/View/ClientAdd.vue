<template>
  <CoreFormDialog
    :iconButton="iconButton"
    :textButton="textButton"
    :textTitle="textTitle"
    :textSave="textSave"
    :textCancel="textCancel"
    :ps="ps"
    :item="item"
  ></CoreFormDialog>
</template>
<script>
export default {
  props: {},
  data: () => ({
    iconButton: "mdi-account-plus",
    textButton: "Add New Client",
    textTitle: "New Client",
    textSave: "Create",
    textCancel: "Cancel",
    ps: "** More information can be added later **",
    item: [
      {
        flex: "xs12 sm6",
        key: "first_name",
        label: "First Name",
        required: true,
      },
      {
        flex: "xs12 sm6",
        key: "last_name",
        label: "Last Name",
        required: true,
      },
      {
        flex: "xs12",
        key: "email",
        label: "Email",
        type: "email",
        required: true,
      },
      {
        flex: "xs12 sm6",
        key: "phone_number",
        label: "Phone Number",
        required: true,
      },
      // {
      //   flex: "xs12",
      //   key: "age",
      //   label: "Age",
      //   type: "number",
      //   required: true,
      // },
      // {
      //   flex: "xs12",
      //   key: "detail",
      //   label: "Detail",
      //   type: "textarea",
      //   required: true,
      // },
    ],
  }),
  methods: {},
};
</script>