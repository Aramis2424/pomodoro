export const requestNotificationPermission = () => {
    if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              return
            }
            else if (permission === "default") {
                alert("Включите уведомления")
            } else {
              alert("Уведомления отключены – работа сервера невозможна")
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
