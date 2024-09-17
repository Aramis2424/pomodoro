export const requestNotificationPermission = () => {
    if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
            if (permission !== "default") {
                alert("Уведомления можно включить.")
            } else if (permission !== "granted") {
              alert("Уведомления отключены пользователем.")
          }
        })
    }
}

export const showNotification = () => {
  if (Notification.permission === "granted") {
    new Notification("Таймер завершен", {
      body: `Помидор`,
      icon: "https://cdn-icons-png.flaticon.com/512/992/992700.png", // Иконка уведомления
    })
  }
}
