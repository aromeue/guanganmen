var parseAPPID = "xswLUvesMLxFn9m7RxrDIe8nm0SUpH5rc1qovB0Z";
var parseJSID = "KkXlX1iXMlkLFTyR5VpmyDerIde4kFbuwRRSYdlb";

//Initialize Parse
    Parse.initialize(parseAPPID, parseJSID);
    
	var inst = Parse.getCurrentInstallation();
	
	alert(inst);
	
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
      testObject.save({foo: "bar"}, {
      success: function(object) {
        $(".success").show();
      },
      error: function(model, error) {
        $(".error").show();
      }
    });

