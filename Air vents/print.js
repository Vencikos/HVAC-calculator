const myApp = (function () {
  this.printTable = function () {
    const tab = document.getElementById("tab");
    const win = window.open("", "", "height=700,width=700");
    win.document.write(tab.outerHTML);
    win.document.close();
    win.print();
  };
})();
