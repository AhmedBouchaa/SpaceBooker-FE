/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/app.component.html",
    "./src/app/app.component.ts",
    "./src/index.html",
    "./src/main.ts",
    "./src/app/main/main.component.html",
    "./src/app/main/main.component.ts",
    "./src/app/main/nav/nav.component.html",
    "./src/app/main/nav/nav.component.ts",
    "./src/app/main/sidenav/sidenav.component.html",
    "./src/app/main/sidenav/sidenav.component.ts",
    "./src/app/main/reservations/reservations.component.html",
    "./src/app/main/reservations/reservations.component.ts",
    "./src/app/main/reservations/make-reservation/make-reservation.component.html",
    "./src/app/main/reservations/make-reservation/make-reservation.component.ts",
    "./src/app/main/reservations/my-reservations/my-reservations.component.html",
    "./src/app/main/reservations/my-reservations/my-reservations.component.ts",
    "./src/app/main/profile/profile.component.html",
    "./src/app/main/profile/profile.component.ts",
    "./src/app/main/event/event.component.html",
    "./src/app/main/event/event.component.ts",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%) translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateY(0) translateX(-50%)', opacity: '1' }
        }
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out forwards'
      }
    },
  },
  plugins: [],
};
