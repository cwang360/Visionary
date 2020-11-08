
$(function(){
  chrome.storage.sync.get(['size','mode', 'padding','highlightMode','font','removeImg','removeLk','color'], function(saved){
    $('#size').text(saved.size);
    $('#fontSizeSlider').val(saved.size);
    $('#paddingSlider').val(saved.padding);
    $('#fontChange').val(saved.font);
    $('#modes').val(saved.mode);
    $('#colorScheme').val(saved.color);
    console.log(saved.highlightMode);
    if(saved.highlightMode == "default"){
      document.getElementById("default").checked = true;
    }else if(saved.highlightMode == "wordImage"){
      document.getElementById("wordImage").checked = true;
    }else if(saved.highlightMode == "highlight"){
      document.getElementById("highlight").checked = true;
    }
    document.getElementById("removeImage").checked = saved.removeImg;
    document.getElementById("removeLink").checked = saved.removeLk;
    
    
  })
  

  $('#fontSizeSlider').click(function(tab){
    chrome.storage.sync.get('size', function(setSize){
      var size = $('#fontSizeSlider').val();
      chrome.storage.sync.set({'size': size});

      $('#size').text(size);
      $('#fontSizeSlider').val(size);

      let msg = {
        txt: "change font size",
        fontSize: size+"px"
      }
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg)
      });
    })
  })

  $('#paddingSlider').click(function(tab){
    chrome.storage.sync.get('padding', function(setPadding){
      var padding = $('#paddingSlider').val();
      chrome.storage.sync.set({'padding': padding});

      $('#paddingSlider').val(padding);
      let msg = {
        txt: "change padding",
        spacing: (padding)/10+"em",
        padding: (padding-15)+"px"
      }
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg)
      });
    })
  })
////highlight mode radio buttons
  $('#default').click(function(tab){
    chrome.storage.sync.get('highlightMode', function(setHighlightMode){
      chrome.storage.sync.set({'highlightMode': "default"});
      let msg = {
        txt: "change highlight mode",
        hMode: "default"
      }
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg)
      });
    })
  })
  $('#wordImage').click(function(tab){
    chrome.storage.sync.get('highlightMode', function(setHighlightMode){
      chrome.storage.sync.set({'highlightMode': "wordImage"});
      let msg = {
        txt: "change highlight mode",
        hMode: "wordImage"
      }
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg)
      });
    })
  })
  $('#highlight').click(function(tab){
    chrome.storage.sync.get('highlightMode', function(setHighlightMode){
      chrome.storage.sync.set({'highlightMode': "highlight"});
      let msg = {
        txt: "change highlight mode",
        hMode: "highlight"
      }
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg)
      });
    })
  })
  //removeimage
  $('#removeImage').click(function(tab){
    chrome.storage.sync.get('removeImg', function(setRemoveImage){
      console.log($('#removeImage').is(':checked'));
      chrome.storage.sync.set({'removeImg': $('#removeImage').is(':checked')});
      let msg = {
        txt: "toggle remove image",
        removeImg: $('#removeImage').is(':checked')
      }
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg)
      });
    })
  })
  //removelinks
  $('#removeLink').click(function(tab){
    chrome.storage.sync.get('removeLk', function(setRemoveImage){
      console.log($('#removeLink').is(':checked'));
      chrome.storage.sync.set({'removeLk': $('#removeLink').is(':checked')});
      let msg = {
        txt: "toggle remove link",
        removeLk: $('#removeLink').is(':checked')
      }
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg)
      });
    })
  })
    //font
    $('#fontChange').click(function(tab){
      chrome.storage.sync.get('font', function(setFont){
        console.log($('#fontChange').val());
        chrome.storage.sync.set({'font': $('#fontChange').val()});
        let msg = {
          txt: "change font",
          font: $('#fontChange').val()
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, msg)
        });
      })
    })
    //color scheme
    $('#colorScheme').click(function(tab){
      chrome.storage.sync.get('color', function(setFont){
        console.log($('#colorScheme').val());
        chrome.storage.sync.set({'color': $('#colorScheme').val()});
        let msg = {
          txt: "change color scheme",
          color: $('#colorScheme').val()
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, msg)
        });
      })
    })
    //download
    $('#download').click(function(tab){
      
        let msg = {
          txt: "download"
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, msg)
        });
      
    })
    //MODES
    $('#modes').click(function(tab){
      if($('#modes').val()=="focus"){
        var padding = 30;
        var size = 20;
        var font = 'Arial';
        var color = 'plain';
        var removeImg = true;
        var removeLk = true;
      }else if($('#modes').val()=="ease"){
        var padding = 15;
        var size = 16;
        var font = 'Comic Sans MS';
        var color = 'cool';
        var removeImg = false;
        var removeLk = false;
      }
      console.log('changing mode');
      chrome.storage.sync.get([
          'mode', 
          'padding',
          'size',
          'font',
          'color',
          'removeImg',
          'removeLk'
      ], function(setMode){
        console.log($('#modes').val());
        chrome.storage.sync.set({
          'mode': $('#modes').val(),
          'padding': padding,
          'size': size,
          'font': font,
          'color': color,
          'removeImg': removeImg,
          'removeLk': removeLk
        });
        
        let msg = {
          txt: "change mode",
          mode: $('#modes').val(),
          spacing: (padding)/10+"em",
          padding: (padding-15)+"px",
          fontSize: size+'px',
          font: font,
          color: color,
          removeImg: removeImg,
          removeLk: removeLk
        }
        $('#paddingSlider').val(padding);
        $('#fontSizeSlider').val(size);
        $('#colorScheme').val(color);
        $('#fontChange').val(font);
        document.getElementById("removeLink").checked = removeLk;
        document.getElementById("removeImage").checked = removeImg;

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, msg)
        });
      })
    })
})

chrome.runtime.onMessage.addListener(getMessage);

function getMessage(message, sender, sendResponse) {
  console.log(message);

  speak(message);
  
}
