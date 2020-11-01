export default {
  SB_show(state, { text, color }) {
    state.isShow = true
    state.text = text;
    state.color = color
  },
  SB_success(state, text) {
    state.isShow = true
    state.text = text;
    state.color = "success"
  },
  SB_error(state, text) {
    state.isShow = true
    state.text = text;
    state.color = "error"
  },
  SB_hide(state) {
    state.isShow = false
  },
}
