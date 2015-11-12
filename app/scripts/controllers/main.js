'use strict';

/**
 * @ngdoc function
 * @name v2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the v2App
 */
angular.module('v2App')
  .controller('MainCtrl', function ($scope,Cipher,$window) {
    var key,iv;
    $scope.record={message:"Type a message to encrypt",cipher:"Paste cipher text here", passphrase:"passphrased"};
		$scope.iv_drip='101112131415161718191a1b1c1d1e1f';
		$scope.settings={algorithm:"RSA",nbits:1024,duration:0};
  	function encrypt(message){
  		console.log('Message',message);
			$scope.record.encrypted = Cipher.encrypt(message|| $scope.record.message);
  	}

		function change_pass(){
  		Cipher.set_iv($scope.iv_drip);
  		Cipher.set_key($scope.record.passphrase);
  		console.log($scope.record.passphrase);
  		change_message();
		}

  	function change_algo(){
  		Cipher.set_algo($scope.settings.algorithm);
  		change_message();
  	}
  	function change_message(){
  		encrypt($scope.record.message);
  	}

  	function decrypt(message){
  		if(!message || message===""){
  			message=$scope.record.message;
  		}

  		if(!$scope.decryption_key || $scope.decryption_key===""){
  			$scope.decryption_key=Cipher.key;
  		}

			$scope.decrypted = Cipher.decrypt($scope.record.encrypted,$scope.decryption_key);
			return $scope.decrypted;
  	}

    $scope.key=key;
    $scope.iv=iv;
  	$scope.encrypt=encrypt;
  	$scope.decrypt=decrypt;
  	$window.encrypt=encrypt;
		$window.decrypt=decrypt;

  	// $window.crypt=Crypt;
  	$window.C=Cipher;
		change_pass();
  	encrypt();

		$scope.$watch('record.message',change_message);
		$scope.$watch('record.passphrase',change_pass);
		$scope.$watch('settings.algorithm',change_algo);
		$scope.$watch('settings.nbits',change_pass);

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }).config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.definePalette('sky', {
    	"50":"ede7f6",
    	"100":"d1c4e9",
    	"200":"b39ddb",
		  '300': '9575cd',
		  '400': 'c5cae9',
		  '500': 'b39ddb',
		  '600': '5e35b1',
		  '700': '512da8',
		  '800': '4527a0',
		  '900': '311b92',
		  'A100': 'b388ff',
		  'A200': '5c6bc0',
		  'A400': '0d47a1',
		  'A700': 'c5cae9',
	    // 'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
	                                        // on this palette should be dark or light
	    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
	     '200', '300', '400', 'A700']
	   });

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('sky')
      .dark();
  });;
