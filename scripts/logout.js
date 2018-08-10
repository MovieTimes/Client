function logout() {
  localStorage.removeItem('token')
  window.location = '/index.html'
}