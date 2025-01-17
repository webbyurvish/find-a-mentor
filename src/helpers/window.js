export function scrollToTop(scrollDuration = 200) {
  return new Promise((resolve) => {
    const scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function () {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
          resolve();
        }
      }, 15);
  });
}
