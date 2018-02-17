Skip to content
This repository
Search
Pull requests
Issues
Marketplace
Explore
 @vincentwenhua
 Sign out
 Watch 0
  Star 0
  Fork 0 vincentwenhua/eveui
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights  Settings
Comparing changes
Choose two branches to see what’s changed or to start a new pull request. If you need to, you can also compare across forks.
base: master    compare: vincent_modification   Able to merge. These branches can be automatically merged.
 Create pull request
Discuss and review the changes in this comparison with others.
 1 commit
 1 file changed
 0 commit comments
 1 contributor
Commits on Feb 16, 2018
 Vincent Wen
Vincent Wen
accept this change
44b446a
Unified Split
Showing  1 changed file  with 68 additions and 381 deletions.
View  
449  scripts/ia-app.js
@@ -1,7 +1,7 @@
 'use strict';
 
 $(document).ready(
 function() {

       angular.bootstrap(document, ['iaApp']);
     }
 );
 @@ -28,7 +28,7 @@ angular.module('iaApp', [
         'iaAccount',
         'iaAuth',
         'iaMember',
     'iaGuardian',
                                                                             
         'iaContact',
         'iaSupport',
         'iaBrowserLanguage',
 @@ -62,7 +62,7 @@ angular.module('iaApp', [
 
     .value('localeConf', {
         basePath: 'languages',

     defaultLocale: 'en-US',
         sharedDictionary: 'common',
         fileExtension: '.lang.json',
         persistSelection: true,
 @@ -72,13 +72,13 @@ angular.module('iaApp', [
     })
 
     .value('localeSupported', [

     'en-US',
     'zh-CN'
     ])
 
     .value('localeFallbacks', {

     'en': 'en-US',
     'zh': 'zh-CN'
     })
 
     .config(['iaCacheProvider', 'SocketProvider', 'WS_BASE', function(iaCacheProvider, SocketProvider, WS_BASE) {
 @@ -262,6 +262,8 @@ angular.module('iaApp', [
 
         $httpProvider.interceptors.push(['$rootScope', '$q', '$filter', function($rootScope, $q, $filter) {
 
     amplitude.getInstance(Config.AMPLITUDE_APP).init(Config.AMPLITUDE_APP_KEY, null, {batchEvents: false});
              return {
 
                 request: function (config) {
 @@ -359,55 +361,9 @@ angular.module('iaApp', [
                 account.phone.number);
         }
     })

	 
	 
 
     .run(function ($rootScope, $location, $stateParams, $timeout, $controller, $state, $templateCache, $modal, $breadcrumb, Auth, AuthToken, Restangular, Account, iaCache, iaSettings, locale, localeConf, localeEvents, Store, BrowserLanguage, CountriesUtils, Socket, Alert,$window) {
         var preferredLanguage = Store.get('preferredLanguage');
     var callopenid = 0;
     var openidcompare = 0;
		
		$rootScope.invitation_id_read=null;
		
		
		if(_ua.match(/MicroMessenger/i) == 'micromessenger' && !Auth.isLogged())//after invitation_id captured, acquire the invitation_id content, if == pending, then redirect to /account/wct_ecp_invit
				{	
						
						$.ajax({//ajax acquire invitation_id
									type: 'GET',
									url: Config.API_BASE + '/weixin/read_invitation',
									dataType: 'json',
									success: function(result){
									
										if(result.invitation_id!=null) 
										{
											$rootScope.invitation_id_read = result.invitation_id;
											
											
											
										}
										
										if($rootScope.invitation_id_read=='pending'){
											
											window.location.href=Config.API_BASE+"/account/wct_ecp_invit"
										}else{
											
											if($rootScope.invitation_id_read!=null && $rootScope.invitation_id_read!=''){
												
													window.location.href=Config.API_BASE+'/weixin/login?invitation_id='+$rootScope.invitation_id_read;
												
												
											}
										}
									},
									error:function(err){
										
										console.log(err);
									}
								})
						
				}
		
         Restangular.setDefaultHttpFields({cache: iaCache('iceangel')});
         Restangular.setDefaultHeaders({'Accept-Language': iaSettings.getLanguage()});
 
 @@ -429,11 +385,9 @@ angular.module('iaApp', [
         $rootScope.nomination = 'nomination';
         $rootScope.farewell = false;
         $rootScope.isPanic = false;
		
 
         // Get login status.
         $rootScope.logged = Auth.isLogged();
		
         $rootScope.showPartner = Auth.isPartner();
 
         if ($rootScope.logged) {
 @@ -442,7 +396,6 @@ angular.module('iaApp', [
 
         $rootScope.$on('account.login', function () {
             $rootScope.logged = Auth.isLogged();
			
             //Display alert history
 
             if ($rootScope.logged){
 @@ -452,6 +405,7 @@ angular.module('iaApp', [
                         amplitude.getInstance(Config.AMPLITUDE_APP).setUserId(value.id);
                     }
 
                 amplitude.getInstance(Config.AMPLITUDE_APP).init(Config.AMPLITUDE_APP_KEY, null, {batchEvents: false});

 
                     Alert.getAlertHistory(value.id).then(function(res){
 @@ -466,21 +420,17 @@ angular.module('iaApp', [
                 });
             }
 

       amplitude.getInstance(Config.AMPLITUDE_APP).init(Config.AMPLITUDE_APP_KEY, null, {batchEvents: false});
       amplitude.getInstance(Config.AMPLITUDE_APP).logEvent('login-init');
 

       // $rootScope.globals.newMessagesCount = Account.getNonViewedMessages().length || null;
       Account.fetchNonViewedMessages();
         });
 


     $rootScope.$on('authToken', function(event, value) {
             AuthToken.set(value);
 
             $rootScope.logged = Auth.isLogged();
		
         });
 
         //account.language
 @@ -497,8 +447,7 @@ angular.module('iaApp', [
             Account.resetAccount();
             $rootScope.account = {};
             $rootScope.member = null;

     }
 
         $rootScope.settings = {
             showAlert: false
 @@ -513,16 +462,15 @@ angular.module('iaApp', [
         });
 
         $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

      // if(toState.states === "my-account"){    // for language issue in android and ios fromState is not correct 
          //    toState.name = "account.show";       // Need to check  why from state is correct (temporary solution)
          //  }
var ua = navigator.userAgent.toLowerCase();
var s= (/micromessenger/.test(ua)) ? true : false ;
 
       var ua = navigator.userAgent.toLowerCase();
        var s= (/micromessenger/.test(ua)) ? true : false ;
$rootScope.browserName =s;
 


       if(toState.name === 'base.partner' && $rootScope.showPartner){
                  $rootScope.finLoading = false;
                  $rootScope.openFINload = false;
                  Account.getFriends().then(function(friends) {
 @@ -557,7 +505,7 @@ angular.module('iaApp', [
                     $rootScope.nominee = $location.$$search.nominee;
 
                      Account.get().then(function (value){


                         $rootScope.currentEmail = value.email;
 
                           if($rootScope.currentEmail === $rootScope.nominee){
 @@ -569,7 +517,7 @@ angular.module('iaApp', [
                             $rootScope.$broadcast('logout', 'base.login');
                             return;
                         }

                    
                      });
                 }
             }
 @@ -585,16 +533,16 @@ angular.module('iaApp', [
                 showAlert: false
             };
 
            amplitude.getInstance(Config.AMPLITUDE_APP).logEvent('navigation-'+toState.name);
 
             if(toState.name === 'account-active' || toState.name === 'base.reset-password'){
                 Auth.logout();
                 Account.resetAccount();
                 $rootScope.$broadcast('logout', 'base.login');
                 return;
             }

         
            if (toState.name === 'base.login' && fromState.name === 'account.show') {
                 if (Auth.isLogged()) {
                     event.preventDefault();
 
 @@ -614,14 +562,6 @@ angular.module('iaApp', [
                 $rootScope.$broadcast('logout', 'base.login');
             }
 
          if(toState.name === 'account.edit'){
             if($rootScope.account!==null && $rootScope.account.phone===false){
                 $rootScope.account.phone={};
                 $rootScope.account.phone.code=47;
                 $rootScope.account.nationality = 47;
             }
         }
-
             // mark messages as read when leaving message centre
             if (fromState.name === 'account.messages' && Auth.isLogged()) {
                 if (Account.getNonViewedMessages()) {
 @@ -637,266 +577,55 @@ angular.module('iaApp', [
                 if (toState.url === '/trigger-alert') {
                     return;
                 }
				
				
				
				var _ua = navigator.userAgent.toLowerCase();//if wehat, do not redirect-to
             if (toState.isLoggedIn && !Auth.isLogged() && _ua.match(/MicroMessenger/i) != "micromessenger") {

 
                     var params = $location.search();
 
                     params['redirect-to'] = $location.path();

                     event.preventDefault();

                     $state.go('base.login', params);
                 }
				
 

                if (!toState.isLoggedIn && Auth.isLogged()) {
                     event.preventDefault();
                 $state.reload();
					
					
					if (_ua.match(/MicroMessenger/i) == "micromessenger"){
						if(!redirectTo){
							var redirectTo='account.messages';
						}
						
						$state.go(redirectTo);					
						return
					}else{
						
						$state.go('account.show');
						return
					}		
					return;				
				}

                 if (toState.isLoggedIn && toState.visibleUnsync) {

                 $rootScope.visibleUnsync = true;                   
                 }
                 else
                 {

                  $rootScope.visibleUnsync = false; 
                 }
 
 
                 if (!toState.isPartner && Auth.isPartner()  && Auth.isLogged()) {
                     event.preventDefault();
                     $state.go('base.partner');
                 }
            
                 if (!Auth.isPartner() && toState.name === 'base.partner'  && Auth.isLogged()) {
                     event.preventDefault();
					$state.reload();
                 //$state.go('account.show');
             }

             }
 
         });
 
     $rootScope.$on('$stateChangeSuccess', function() {//Vincent Start
-
         $rootScope.hrefbase = Config.API_BASE;
         if($location.$$path=='/account'){
             if(sessionStorage.getItem('wechatModePop')==null || sessionStorage.getItem('wechatModePop') == 'NaN'){
                 sessionStorage.setItem('wechatModePop', 1);
             }
             else sessionStorage.setItem('wechatModePop', parseInt(sessionStorage.getItem('wechatModePop'))+1);
         }
         // console.log("============sessionStorage=============")
         // console.log(sessionStorage)
         // console.log("============sessionStorage=============")
         if(sessionStorage.getItem('wechatModePop')==1){
             $rootScope.wechatModePop=true;
         }
         else{
             $rootScope.wechatModePop=false;
         }
-
-
         if($location.search().callopenid){
             callopenid = $location.search().callopenid;
         }
         else callopenid = 0;
         if($location.search().openidcompare){
             openidcompare = $location.search().openidcompare;
         }
         else openidcompare = 0;
         var _url = Config.API_BASE + '/weixin/login';
         if($location.$$search.invitation==1){
             _url = Config.API_BASE + '/account/wct_ecp_invit';
         }
			
         var _path = $location.$$path.substring(1);
			if(_path.indexOf('sign_up')!=-1){
             _url = Config.WEB_BASE + '/registration/wct_sign_up';
         }
         var _ua = navigator.userAgent.toLowerCase();
         // console.log(callopenid);
			var _ua = navigator.userAgent.toLowerCase();
			
			if(_ua.match(/MicroMessenger/i) != "micromessenger"){
				var redirectTo = $state.params['redirect-to'];
			}else{
				if ($location.search().webtgt){
					var redirectTo = $location.search().webtgt.replace('%2f','.'); //Vincent Change
					
				}else{
					var redirectTo = 'account'; //Vincent Change
				}
				
			}
         console.log("=========================")
         console.log(callopenid)
         console.log(openidcompare)
         console.log("=========================")

         if(openidcompare ==1 && !$rootScope.logged){

             if (_ua.match(/MicroMessenger/i) == "micromessenger") {
                 $.ajax({
                     type: 'GET',
                     url: Config.API_BASE + '/weixin/getToken?weixin=1',
                     dataType: 'json',
                     success: function(result){
                         console.log(result);
                         var token = result.token;
                         Auth.authenticate({'access_token': token}).then(
                             function (res) {
                                 $rootScope.redirecting = true;
									
                                 // Socket.getConnection();

                                 // Fire logged events
                                 $rootScope.$broadcast('account.login', res.data);
                                 Account.get()
                                     .then(function() {
											var _ua = navigator.userAgent.toLowerCase();
                                         if (redirectTo && _ua.match(/MicroMessenger/i) != "micromessenger") {
                                            
												$location.url(redirectTo);
                                         } else {
                                             //$state.transitionTo('account.show', {});
												//$window.location.reload();
												$state.reload();
                                         }
                                     });
                             },
                             function (err) {
                                 errors = [];
                                 if (err.data && err.data.error) {
                                     errors.push(err.data.error);
                                 }
                                 $location.url('/login');
                             });
                     },
                     error:function(err){
                         console.log(err);
                     }
                 })
             }
             else{

                 $.ajax({
                     type: 'GET',
                     url: Config.API_BASE + '/weixin/getToken?weixin=2',
						dataType: 'json',
                     success: function(result){
                         console.log(result);
                         var token = result.token;
                         Auth.authenticate({'access_token': token}).then(
                             function (res) {
                                 $rootScope.redirecting = true;
                                 // Socket.getConnection();

                                 // Fire logged events
                                 $rootScope.$broadcast('account.login', res.data);
                                 Account.get()
                                     .then(function() {
											var _ua = navigator.userAgent.toLowerCase();
                                         if (redirectTo && _ua.match(/MicroMessenger/i) != "micromessenger") {
												
                                             $location.url(redirectTo);
                                         } else {
                                             //$state.transitionTo('account.show', {});
                                         }
                                     });
                             },
                             function (err) {
                                 errors = [];
                                 if (err.data && err.data.error) {
                                     errors.push(err.data.error);
                                 }
                                 $location.url('/login');
                             });
                     },
                     error:function(err){
                         console.log(err);
                     }
                 })
             }
         }


         if (_ua.match(/MicroMessenger/i) == "micromessenger") {
             $rootScope.iswechat = true;
         }
         else{
             $rootScope.iswechat = false;
         }
         if (_ua.match(/MicroMessenger/i) == "micromessenger" && callopenid !=1) {//webtgt control
             if(sessionStorage.getItem('webtgt')==null || sessionStorage.getItem('webtgt') == 'NaN'){
					
                 sessionStorage.setItem('webtgt', 1);
             }else 
				{
					
					sessionStorage.setItem('webtgt', parseInt(sessionStorage.getItem('webtgt'))+1);
				}

             if(sessionStorage.getItem('webtgt')==1 && !Auth.isLogged()){
					
					if($location.search().invitation_id){
						
						window.location=_url+'?webtgt=account%2fmessages' + '&invitation_id='+$location.search().invitation_id;
					}else{
						

						if (_path.indexOf('active-account')!=-1 && _path.indexOf('sign_up')!=-1 && !Auth.isLogged()){
							alert('bp1');
							window.location=_url+'?invitation_id='+$rootScope.invitation_id_read;
						}else{
							alert('bp2');
							if(_path!=''){
							window.location=_url+'?webtgt=' + _path;
							}else{
								window.location=_url
							}
						}
					}
             }
             console.log(sessionStorage.getItem('webtgt'))

         }
//Vincent End
     $rootScope.$on('$stateChangeSuccess', function() {
             resetErrorMessagesAndOtherFlags();
             $timeout(function() {
                 window.scrollTo(0, 0);

                 $rootScope.settings = {
                     showAlert: true
                 };
             }, 0);
         });
 

         $rootScope.$on('alerts.received', function(event, alerts) {
             if (alerts) {
                 if (angular.isDefined(alerts.members)) {
 @@ -957,7 +686,7 @@ angular.module('iaApp', [
         };
 
         $rootScope.toggleAlerts = function(){

         $rootScope.alerts_limit =  $rootScope.alerts.length !== $rootScope.alerts_limit ? 
                                         $rootScope.alerts.length : Alert.getLimit();
             setTimeout(function() {
                 $('html, body').animate({scrollTop : 0}, 400);
 @@ -985,9 +714,9 @@ angular.module('iaApp', [
                     $rootScope.loadMoreAlerts();
                 }
 

             
             });

         // $rootScope.globals.newMessagesCount = Account.getNonViewedMessages().length || null; 
             Account.fetchNonViewedMessages();
         }
 
 @@ -1052,7 +781,6 @@ angular.module('iaApp', [
                 case 403:
                     if (response.data.error.type === 'UserBannedException') {
                         $rootScope.userBanned = true;
						
                         $state.go('base.home');
                     }
 
 @@ -1077,12 +805,11 @@ angular.module('iaApp', [
 
             Account.clearAllMessages();
             $rootScope.globals.newMessagesCount = null;

             amplitude.getInstance(Config.AMPLITUDE_APP).logEvent('logout');
             amplitude.getInstance(Config.AMPLITUDE_APP).setUserId(null);
 
             next ? $state.go(next) : $state.transitionTo('base.home', {});

         });
 
         // Logout
 @@ -1133,18 +860,6 @@ angular.module('iaApp', [
         }
     })
 
	 /**
  * WoaQrcode Controller Vincent Start
  */
 .controller('WoaQrcode', function ($rootScope, $scope) {
     console.log($rootScope);
     var body = angular.element(document).find('body').eq(0);
     angular.element(document).find('body').eq(0).addClass('wechat-popupcon');
 })
		//Vincent End
     /**
      * Main Controller
      */
 @@ -1158,6 +873,8 @@ angular.module('iaApp', [
                 iaSettings.setLanguage(lang);
             }
       //  }
     amplitude.getInstance(Config.AMPLITUDE_APP).init(Config.AMPLITUDE_APP_KEY, null, {batchEvents: false});
+
         $rootScope.isSafariPrivate = false;
         $scope.isVisible = function isElementInViewport (el) {
 
 @@ -1213,7 +930,7 @@ angular.module('iaApp', [
 
         });
 

   
 
   if (typeof localStorage === 'object') {
     try {
 @@ -1233,9 +950,9 @@ angular.module('iaApp', [
      * Account Controller
      */
     .controller('AccountController', function ($state, $rootScope, $scope, $controller, Auth, Socket,Account,locale,MEDIA_BASE,$window,AuthToken,$http,iaSettings,Restangular ) {

     
         /// disable coupon change validation

// $(document).ready(function(){ 
 //     $('#couponSpinner').css('display','none');
 //    $('#couponElement').focusout(function () {
 //      $rootScope.redirecting=true; // to stop global spinner
 @@ -1258,10 +975,10 @@ angular.module('iaApp', [
 //                  $rootScope.redirecting=false; // to stop global spinner
 //            $('#couponSpinner').css('display','none');
 //             });

 
 
 //  });

          
 //  });
         $scope.addClass = function(){
             if ($(".ecp_list_details").hasClass("slideup"))
 @@ -1271,77 +988,48 @@ angular.module('iaApp', [
         }
 
         $rootScope.openFIN =  Config.MEDIA_BASE + 'media/qr/iCE_';
		
		
		
		$scope.wechatshareprofile = function(){
			
			 $rootScope.redirecting=true; 
         $rootScope.reqLoading = true;
         $scope.showError = false;
         var token = AuthToken.get();
         var req = {
                     method: 'GET',
                     url: Config.API_BASE+'/weixin/shareprofile',
                     headers: {
                       'X-Authorization':'Bearer ' + token,
                       'Accept-Language': iaSettings.getLanguage()
                     }
                   }
         $http(req)
             .then(function(res)
                 {
                     var anchor = angular.element('<a/>');
                         anchor.css({display: 'none'});
                         angular.element(document.body).append(anchor);
                         anchor.attr({
                             href: res.data.url,
                             target: '_self',
                            
                         })[0].click();
                         anchor.remove();
                     $rootScope.redirecting=false;
                     $rootScope.reqLoading = false;
                 },
                 function(error)
                 {
                     $rootScope.reqLoading = false;
                     $scope.showError = true;
                 });
		}	
 
         $scope.downloadScreen = function(){
             $rootScope.redirecting=true; // to stop global spinner
             $rootScope.reqLoading = true;

         $scope.showError = false; 
             var token = AuthToken.get();
             var req = {
                         method: 'GET',
                         url: Config.API_BASE+'/lockscreen',
                         headers: {
                           'X-Authorization':'Bearer ' + token,
                           'Accept-Language': iaSettings.getLanguage()

                     } 
                       }
             $http(req)
                 .then(function(res)
                     {
                        var anchor = angular.element('<a/>');

                             anchor.css({display: 'none'});
                             angular.element(document.body).append(anchor);
                             anchor.attr({
                                 href: res.data.url,
                                 target: '_self',
                                 download: 'iCE_wallpaper.jpg'

                         })[0].click();                                
                             anchor.remove();
              
                         $rootScope.redirecting=false;
                         $rootScope.reqLoading = false;
                 },

                     function(error)
                     {
                         $rootScope.reqLoading = false;

                     $scope.showError = true;              
                     });
         }
 
 @@ -1363,11 +1051,11 @@ angular.module('iaApp', [
                 if ($rootScope.previewMode) {
                     return false;
                 }

             
                 if (account_id == contact.id) {
                     return false;
                 } else {

                 
                     if (contact.status == 'accepted') {
                         $state.transitionTo('account.setEcpPermission', {member_id: member_id, contact_id: contact.id});
                     } else {
 @@ -1421,4 +1109,3 @@ angular.module('iaApp', [
             content: pages['body_' + iaSettings.getLanguage()]
         };
     }]);
	 
No commit comments for this range
© 2018 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About
