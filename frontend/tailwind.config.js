export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        background: '#f1f5f9',
        surface: '#ffffff',

        // 🔥 ADMIN DARK
        sidebar: '#0f172a',
        sidebarHover: '#1e293b',
        topbar: '#020617',

        'text-primary': '#0f172a',
        'text-secondary': '#64748b'
      }
    }
  },
  plugins: []
}
