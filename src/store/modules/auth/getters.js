export default {
  authorized: state => !!state.token,
  authstatus: state => state.authStatus
}
