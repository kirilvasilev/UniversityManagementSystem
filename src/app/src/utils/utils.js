//Define helper functions here

const clickCatch = dialog => {
    dialog.addEventListener('click', function (event) {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
            && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            dialog.close();
        }
    });
};

const toLocaleDateStr = (date, properties) => new Date(date).toLocaleDateString("en-US", properties);

const formatDate = date => toLocaleDateStr(date, {month: 'long', day: 'numeric'});
const formatDateYear = date => toLocaleDateStr(date, {year: 'numeric', month: 'long', day: 'numeric'});
const formatHours = date => new Date(date).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric'});

export { clickCatch, formatDate, formatHours, formatDateYear };