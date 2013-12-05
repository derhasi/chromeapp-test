chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('../window.html',
    {
      'bounds': {
        'width': 400,
        'height': 500
      }
    },
    function (createdWindow) {
      createdWindow.contentWindow.foo = function () {
        return 'Fenster 1';
      };
    }
  );

  chrome.app.window.create('../w2.html',
    {
      'bounds': {
        'width': 200,
        'height': 200
      }
    },
    function (createdWindow) {
      createdWindow.contentWindow.foo = function () {
        return 'Fenster 2';
      };
    }
  );
});




