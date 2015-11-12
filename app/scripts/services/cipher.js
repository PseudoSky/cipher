'use strict';
/**
 * @ngdoc service
 * @name v2App.Cipher
 * @description
 * # Cipher
 * Factory in the v2App.
 */


//
/***********    Generating an RSA key pair & public key string    **********


Sam wants to send Matt an encrypted message. In order to do this, he first needs Matt's public key string. A public key pair can be generated for Matt like this:


// The passphrase used to repeatably generate this RSA key.
var PassPhrase = "The Moon is a Harsh Mistress.";

// The length of the RSA key, in bits.
var Bits = 1024;

// Private Key
var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);

// Matt's public key string can then be generated like this:
var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);


// and looks like this:

uXjrkGqe5WuS7zsTg6Z9DuS8cXLFz38ue+xrFzxrcQJCXtVccCoUFP2qH/AQ
4qMvxxvqkSYBpRm1R5a4/NdQ5ei8sE8gfZEq7dlcR+gOSv3nnS4/CX1n5Z5m
8bvFPF0lSZnYQ23xlyjXTaNacmV0IuZbqWd4j9LfdAKq5dvDaoE=



**/


angular.module('v2App')
  .factory('Cipher', function () {
    // generateAESKey
    // generateRSAKey
    // publicKeyString
    // publicKeyID
    // publicKeyFromString
    // encrypt
    // decrypt
      var key,iv,algo;

      this.set_algo = function(name){
        if (this.algo && this.algo.name==name){
          console.log('Same encryption: '+name);
          return -1;
        }
        if(name===undefined || name=="" || (!CryptoJS.hasOwnProperty(name)&&name != "RSA")){
          console.log('No algorithm with the name: '+name);
          return -1;
        }
        else if(name == "RSA"){
          this.algo=cryptico;
        }
        else if(CryptoJS.hasOwnProperty(name)){
          this.algo=CryptoJS[name];
        }

        this.algo.name=name;
        console.log('New algorithm Selected: '+name);
      };

      // Set default algorithm to RSA
      this.set_algo("RSA");


      this.set_key= function(k,bits){
        if(!bits){
          bits=1024;
        }
        if (k !== undefined && k!=="") {
          this.key = k;
          console.log(this.algo);
          if(this.algo.name=="RSA"){
            this.key=this.algo.generateRSAKey(k, bits);
            this.algo.private_key=this.key;

            this.algo.public_key=this.algo.publicKeyString(this.algo.private_key);
            this.key=this.algo.public_key;
            // this.algo.piblic_key_id=this.algo.publicKeyID(this.algo.public_key);
            console.log(this.algo);
          }

        }
        else{
          console.log('Key undefined or blank: '+k);
        }

        // Other version, used in the example
        // this.key = CryptoJS.enc.Utf8.parse(k);
      };

      this.set_iv= function(v){

        this.iv  = CryptoJS.enc.Hex.parse(v);
      };


      // this.$get = [function(){
      //     return {
      //         algo: this.algo,
      //         key: this.key,
      //         iv: this.iv,

      //         set_key: this.set_key,
      //         set_iv: this.set_iv,

      this.encrypt=function(message, k) {
        console.log("Key"+k);
          if (k === undefined) {
              k = this.key||this.algo.public_key;
          }
          if(this.algo.name=="RSA"){
            // console.log('Message: '+message,"Key: "+this.algo.public_key, this.algo.encrypt(message, this.algo.publicKeyString(this.algo.private_key) ));
            console.log(message,this.algo.public_key);
            return this.algo.encrypt(message, this.algo.public_key)['cipher'];
          }else{

            console.log('Message: '+message,"Key: "+key,"IV: "+this.iv);
            return this.algo.encrypt(message, k, {iv: this.iv} ).toString();
          }
      };

      this.decrypt= function(message, k) {
          if (k === undefined) {
              k = this.key||this.algo.private_key;
          }
          if(_.isObject(message) && _.hasKey(message,"cipher")){
            message=message.cipher;
          }
          console.log('Key',this.algo.private_key);

          if(this.algo.name=="RSA"){

            return this.algo.decrypt(message, this.algo.private_key);
          }
          return this.algo.decrypt(message, k, {iv: this.iv}).toString(CryptoJS.enc.Utf8);
      };
      //     };
      // }];
      return this;
  });


