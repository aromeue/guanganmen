var parseAPPID = "xswLUvesMLxFn9m7RxrDIe8nm0SUpH5rc1qovB0Z";
var parseJSID = "KkXlX1iXMlkLFTyR5VpmyDerIde4kFbuwRRSYdlb";

//Initialize Parse
Parse.initialize(parseAPPID,parseJSID);

Parse.subscribe('Guang An Men', function() {
	
			parsePlugin.getInstallationId(function(id) {
		
					/**
					 * Now you can construct an object and save it to your own services, or Parse, and corrilate users to parse installations
					 * 
					 var install_data = {
						installation_id: id,
						channels: ['SampleChannel']
					 }
					 *
					 */
		
			}, function(e) {
					alert('error1'+e);
			});
	
		}, function(e) {
			alert('error2'+e);
		});

