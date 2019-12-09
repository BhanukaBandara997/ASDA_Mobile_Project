$(function() {
    // define the application
    var ASDA_Project = {};
    var pgtransition = 'slide';
    var currentLoggedUser = null;
    var favouritesSelectorValue = "ALL_PRODUCTS";
    var deleteFavouriteItemsList = [];
    var shareFavouriteItem = null;
    var moveFavouriteItemsList = [];
    var selectedItemId = null;
    var selectedItemName = null;
    var selectedFavouriteListName = "Default_Favourite_List";
    var createNewFavouriteListName = '';
    var newListCreated = false;
    (function(app) {

        $(".ui-field-contain").css({ 'border-bottom-style': 'none' });

        // Back Buttons For Welcome Pages
        $('#logInBackBtn,#resetPasswordSuccessBackBtn,#createAccountBackBtn,#accountCreationSuccessBackBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgWelcome', { transition: pgtransition });
        });

        $('#forgetPasswordBackBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgLoginIn', { transition: pgtransition });
        });

        $('#resetPasswordBackBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgForgetPassword', { transition: pgtransition });
        });

        ////////////////////////////////////////////////////////////////////////////
        $('#pgAccountCreationSuccessBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgLoginIn', { transition: pgtransition });
        });

        $('#forgetPasswordBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgForgetPassword', { transition: pgtransition });
        });

        $('#signInBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgLoginIn', { transition: pgtransition });
        });

        $('#pgResetPasswordSuccessBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgLoginIn', { transition: pgtransition });
        });

        $('#newProductsBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.GetTopSelectionOrNewProductsListItems("NewProducts");
            $.mobile.changePage('#pgNewProducts');
        });

        $('#playAndWinBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgPlayAndWin');
        });

        $('#findStoresBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgFindStores');
        });

        $('#topSelectionBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.GetTopSelectionOrNewProductsListItems("TopSelection");
            $.mobile.changePage('#pgTopSelection');
        });

        $('#flashDealtsBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.GetFlashDealsListItems();
            $.mobile.changePage('#pgFlashDeals');
        });

        $('#newProductsBackBtn, #flashDealsBackBtn, #topSelectionBackBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgHome');
        });

        $('#homeHomeBtn, #shopHomeBtn, #searchHomeBtn, #favHomeBtn, #accHomeBtn, #flashDealsHomeBtn, #newProductsHomeBtn, #topSelectionHomeBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgHome');
        });

        $('#homeShoppingBtn, #shopShoppingBtn, #searchShoppingBtn, #favShoppingBtn, #accShoppingBtn, #flashDealsShoppingBtn, #newProductsShoppingBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.GetCategories();
            $.mobile.changePage('#pgShop');
        });

        $('#homeSearch, #shopSearch, #searchSearch, #favSearch, #accSearch, #flashDealsSearch, #newProductsSearch, #topSelectionSearch').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgSearch');
        });

        $('#homeFavouritesBtn, #shopFavouritesBtn, #searchFavouritesBtn, #favFavouritesBtn, #accFavouritesBtn, #flashDealsFavouritesBtn, #newProductsFavouritesBtn, #topSelectionFavouritesBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            //localStorage.setItem('newListCreated', false);
            if (localStorage.getItem('newListCreated') === "true") {
                $('#favouriteItemListDiv').empty();
                $('#favouriteListParentDiv').empty();
                $('#favouriteItemListDiv').css('display', 'none');
                $('#favouriteListParentDiv').css('display', 'block');
                $('#createFavListBtn').remove();
                var favouriteLists = getFavouriteLists();
                $.each(favouriteLists.FavouriteLists, function(index) {
                    var parent = $('#favouriteListParentDiv');
                    appendFavouriteListsToParent(parent, this, index);
                });

                var favouriteListOptionParent = $('<option>', {
                    'style': 'color: #333 !important; font-size: 9px !important;',
                    'value': 'MY_LISTS'
                });
                favouriteListOptionParent.text("MY LISTS");
                $('#favSelect').append(favouriteListOptionParent);

                var createFavBtn = $('<button>', {
                    'id': 'createFavListBtn',
                    'class': 'ui-btn-fab ui-btn-raised ui-btn ui-btn-inline waves-effect waves-button waves-effect waves-button',
                    'style': 'position: absolute; display: block; right: 3%; width: 40px; top: -100%; border: 0.2px solid rgba(0, 0, 0, 0.8); box-sizing: border-box !important; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25) !important;'
                }).on('click', function() {
                    $('#createNewFavListPopupDialog').popup('open');
                });

                var createFavBtnIcon = $('<i>', {
                    'class': 'zmdi zmdi-plus zmd-2x',
                    'style': 'color: rgba(227, 9, 9, 0.9);'
                });

                createFavBtn.append(createFavBtnIcon);

                $('#fav-footer').append(createFavBtn);

            } else {
                //var currentLoggedUser = localStorage.getItem("currentLoggedInUser");
                var currentLoggedUser = "User_001";
                app.GetFavouriteListForUser(currentLoggedUser, favouritesSelectorValue);
                getFavouriteListsForUser();
                $('#favouriteItemListDiv').css('display', 'block');
                $('#favouriteListParentDiv').empty();
                $('#favouriteListParentDiv').css('display', 'none');
                $('#createFavListBtn').css('display', 'none');
            }
            $.mobile.changePage('#pgFavourites');
        });

        $('#homeAccountBtn, #shopAccountBtn, #searchAccountBtn, #favAccountBtn, #accAccountBtn, #flashDealsAccountBtn, #newProductsAccountBtn, #topSelectionAccountBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var currentUserLoggedIn = app.GetCurrentUser();
            $("#user-name").text(currentUserLoggedIn);
            app.MemberCenterDetails();
            $.mobile.changePage('#pgAccount');
        });

        ///////////////////////  Sign Up Account  ////////////////////////////////////////////////////////////////

        $('#pgCreateAccForm').submit(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // save the User
            var userRecObj;
            //check password matching
            var passwordMatched = checkPasswordMatch($('#pgSignUpPassword').val().trim(), $('#pgSignUpConfirmPassword').val().trim());
            if (passwordMatched) {
                //get form contents into an object
                userRecObj = pgAddUserDetailsToObj();
                //save object to JSON and return saved status
                var userAddedSucce = app.addUser(userRecObj);

                if (userAddedSucce) {
                    $.mobile.changePage('#pgAccountCreationSuccess', { transition: pgtransition });
                } else {
                    toastr.error('User record not saved properly. Please try again.');
                }
            }

        });

        // ***** Add Page *****
        // get the contents of the add screen controls and store them in an object.
        //get the record to be saved and put it in a record array
        //read contents of each form input
        function pgAddUserDetailsToObj() {
            //define the new record
            var userRecObj
            userRecObj = {};
            var userName = $('#pgSignUpEmail').val().trim();
            userName = userName.split('@')[0];
            userRecObj.Name = userName;
            userRecObj.Email = $('#pgSignUpEmail').val().trim();
            userRecObj.Password = $('#pgSignUpPassword').val().trim();
            userRecObj.Password = sjcl.encrypt('MashJQMShow', userRecObj.Password);
            userRecObj.ConfirmPassword = $('#pgSignUpConfirmPassword').val().trim();
            userRecObj.ConfirmPassword = sjcl.encrypt('MashJQMShow', userRecObj.ConfirmPassword);
            userRecObj.FourDigitCode = "0000";
            userRecObj.AddressOne = null;
            userRecObj.AddressTwo = null;
            userRecObj.UserGender = null;
            userRecObj.BirthDay = null;
            userRecObj.LoyaltyPoints = 0;
            userRecObj.FirstName = null;
            userRecObj.LastName = null;
            return userRecObj;
        }

        // add a new record to server storage.
        app.addUser = function(userRecObj) {
            //convert record to json to write to server
            var recordJSON = JSON.stringify(userRecObj);
            // save the data to a server file, use the post method as it has 8MB minimum data limitation
            var req = Ajax("./controllers/ajaxSaveCustomer.php", "POST", recordJSON);
            if (req.status == 200) {
                if (req.status == 200) {
                    // clear the edit page form fields
                    pgSignUpInClear();
                    return true;
                } else {
                    //show a toast message that the record has not been saved
                    toastr.error('User Record Not Saved. Please Try Again.');
                }
            };

        };

        //clear the forms for new data entry
        function pgSignUpInClear() {
            $('#pgSignUpEmail').val('');
            $('#pgSignUpPassword').val('');
            $('#pgSignUpConfirmPassword').val('');
        }

        function checkPasswordMatch(password, confirmPassword) {

            if (password != confirmPassword) {
                toastr.error('Passwords do not match!');
                return false;
            } else {
                return true;
            }

        }


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////  Sign In Account  ////////////////////////////////////////////////////////////////

        // bind the login in click event
        $('#pgLoginInForm').submit(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // verify the user details
            app.SignInUser($('#pgLoginInEmail').val().trim(), $('#pgLoginInPassword').val().trim());
        });


        app.SignInUser = function(Email, Password) {
            // get users
            $('#pgLoginIn').data('success', 'true');
            var userName = Email.trim();
            userName = userName.split('@')[0];
            userName += '.json';
            var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(userName));
            if (req.status == 200) {
                // parse string to json object
                try {
                    var userRec = JSON.parse(req.responseText);
                    // verify password and status of account
                    var pwd = userRec.Password;
                    // decript the password
                    pwd = sjcl.decrypt('MashJQMShow', pwd);
                    if (Password != pwd) {
                        $('#pgLoginIn').data('success', 'false');
                        toastr.error('The password specified is incorrect!');
                        currentLoggedUser = null;
                    }
                } catch (e) {
                    //user file is not found
                    $('#pgLoginIn').data('success', 'false');
                    toastr.error('This User - ' + userName.split('.')[0] + 'is NOT registered in this App!');
                }
            }
            //find if status is successful or not
            var succ = $('#pgLoginIn').data('success');
            if (succ == 'true') {
                // set user name adress to account
                // setUserName(userName);
                pgSignInClear();
                currentLoggedUser = Email.split('@')[0];
                // show the page to display after sign in
                $.mobile.changePage('#pgHome', { transition: pgtransition });
            }
        };

        //clear the forms for new data entry
        function pgSignInClear() {
            $('#pgLoginInEmail').val('');
            $('#pgLoginInPassword').val('');
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////


        ///////////////////////  Forget Password  ////////////////////////////////////////////////////////////////
        // TODO - Send Mail Function Can Be Added
        // bind the login in click event
        $('#pgForgetPasswordForm').submit(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // verify the user details
            app.ForgetPassword($('#pgForgetPasswordEmail').val().trim());
        });


        app.ForgetPassword = function(Email) {
            // get users
            $('#pgForgetPassword').data('success', 'true');
            var userName = Email.trim();
            userName = userName.split('@')[0];
            userName += '.json';
            var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(userName));
            if (req.status == 200) {
                // parse string to json object
                try {
                    var userRec = JSON.parse(req.responseText);
                    if (Email != userRec.Email) {
                        $('#pgForgetPassword').data('success', 'false');
                        toastr.error('This User - ' + userName.split('.')[0] + 'is NOT registered in this App!');
                    } else {
                        var fourDigitCode = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
                        localStorage.setItem("fourDigitCode", fourDigitCode);
                        var recordJSON = {
                            'Email': Email,
                            'FourDigitCode': fourDigitCode
                        }
                        recordJSON = JSON.stringify(recordJSON);
                        var req = Ajax("./controllers/ajaxSendResetCode.php", "POST", recordJSON);
                        if (req.status == 200) {
                            try {
                                toastr.success('Verification Code Sended To Your - ' + Email + ' Address');
                            } catch (e) {
                                toastr.error('An Error Occured While Sending Verification Code');
                            }
                        }
                    }
                } catch (e) {
                    //user file is not found
                    $('#pgForgetPassword').data('success', 'false');
                    toastr.error('This User - ' + userName.split('.')[0] + 'is NOT registered in this App!');
                }
            }
            //find if status is successful or not
            var succ = $('#pgForgetPassword').data('success');
            if (succ == 'true') {
                pgForgetPasswordClear();
                // show the page to display after forget password
                localStorage.setItem("currentLoggedInUser", Email);
                $.mobile.changePage('#pgResetPassword', { transition: pgtransition });
            }
        };

        //clear the forms for new data entry
        function pgForgetPasswordClear() {
            $('#pgForgetPasswordEmail').val('');
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////// Password Reset  ////////////////////////////////////////////////////////////////

        $('#pgResetPasswordForm').submit(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var fourDigitCode = localStorage.getItem("fourDigitCode");
            var passwordMatched = checkPasswordMatch($('#pgResetPasswordInput').val().trim(), $('#pgResetConfirmPassword').val().trim());
            if (passwordMatched) {
                app.PasswordReset(fourDigitCode, $('#pgResetPasswordInput').val().trim(), $('#pgResetConfirmPassword').val().trim());
            } else {
                toastr.error('Password mismatch. Re-enter the correct password again!');
            }
        });

        app.PasswordReset = function(fourDigitCode, newPassword, newConfirmPassword) {
            var Email = localStorage.getItem("currentLoggedInUser");
            var fourLocalDigitCode = localStorage.getItem("fourDigitCode");
            $('#pgResetPassword').data('success', 'true');
            var userName = Email.trim();
            userName = userName.split('@')[0];
            userName += '.json';
            if (fourDigitCode == fourLocalDigitCode) {
                var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(userName));
                if (req.status == 200) {
                    try {
                        var userRec = JSON.parse(req.responseText);
                        var decryptedPassword = sjcl.decrypt('MashJQMShow', userRec.Password);
                        userRec.Password = sjcl.encrypt('MashJQMShow', newPassword);
                        var decryptedConfirmPassword = sjcl.decrypt('MashJQMShow', userRec.ConfirmPassword);
                        userRec.ConfirmPassword = sjcl.encrypt('MashJQMShow', newConfirmPassword);
                        var recordJSON = JSON.stringify(userRec);
                        var req = Ajax("./controllers/ajaxSaveCustomer.php", "POST", recordJSON);
                        if (req.status == 200) {
                            try {
                                var succ = $('#pgResetPassword').data('success');
                                if (succ == 'true') {
                                    pgResetPasswordClear();
                                    // show the page to display after forget password
                                    $.mobile.changePage('#pgResetPasswordSuccess', { transition: pgtransition });
                                }
                            } catch (e) {
                                //user file is not found
                                $('#pgResetPassword').data('success', 'false');
                                toastr.error('Updating Password Error Occured!');
                            }
                        }
                        if (Email != userRec.Email) {
                            $('#pgResetPassword').data('success', 'false');
                            toastr.error('This User - ' + userName.split('.')[0] + 'is NOT registered in this App!');
                        }
                    } catch (e) {
                        //user file is not found
                        $('#pgResetPassword').data('success', 'false');
                        toastr.error('This User - ' + userName.split('.')[0] + 'is NOT registered in this App!');
                    }
                }
            } else {
                toastr.error('The Code You Entered is Invalid. Please Try Again');
            }

        };

        function pgResetPasswordClear() {
            $('#fourDigitCode').val('');
            $('#pgResetPasswordInput').val('');
            $('#pgResetConfirmPassword').val('');
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////



        ///////////////////////////// Update Address //////////////////////////////////////////

        app.UpdateAddress = function(newAddress) {
            var Email = localStorage.getItem("currentLoggedInUser");
            // $('#pgShippingAddress').data('success', 'true');
            var userName = Email.trim();
            userName = userName.split('@')[0];
            userName += '.json';

            var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(userName));
            if (req.status == 200) {
                try {
                    var userRec = JSON.parse(req.responseText);

                    if (userRec.AddressTwo == null && userRec.AddressOne == null) {
                        userRec.AddressOne = newAddress;
                    } else {
                        if (userRec.AddressOne != null && userRec.AddressOne == null) {
                            userRec.AddressTwo = newAddress;
                        }
                        if (userRec.AddressTwo != null && userRec.AddressOne != null) {
                            toastr.error('You cannot add more Addresses');
                        }
                    }
                    var recordJSON = JSON.stringify(userRec);
                    var req = Ajax("./controllers/ajaxSaveCustomer.php", "POST", recordJSON);
                    if (req.status == 200) {
                        try {
                            var succ = $('#pgShippingAddress').data('success');
                            if (succ == 'true') {
                                pgResetPasswordClear();
                                // show the page to display after forget password
                                $.mobile.changePage('#pgShippingAddress', { transition: pgtransition });
                            }
                        } catch (e) {
                            //user file is not found
                            $('#pgShippingAddress').data('success', 'false');
                            toastr.error('Updating Password Error Occured!');
                        }
                    }
                    if (Email != userRec.Email) {
                        $('#pgShippingAddress').data('success', 'false');
                        toastr.error('This User - ' + userName.split('.')[0] + 'is NOT registered in this App!');
                    }
                } catch (e) {
                    //user file is not found
                    $('#pgShippingAddress').data('success', 'false');
                    toastr.error('This User - ' + userName.split('.')[0] + 'is NOT registered in this App!');
                }
            }
        };

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        $('#back-icon-sub-category').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgShop', { transition: pgtransition });
        });

        $('#user-name, #profile-pic').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.PopulateAllBacisInfo();
            app.MemberCenterDetails();
            $.mobile.changePage('#pgEditAccount', { transition: pgtransition });
        });

        // $('#user-name, #profile-pic').on('click', function(e) {
        //     e.preventDefault();
        //     e.stopImmediatePropagation();
        //     $.mobile.changePage('#pgEditAccount', { transition: pgtransition });
        // });

        $('#about-us-icon, #about-us-text').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgAboutUs', { transition: pgtransition });
        });

        $('#back-icon-edit-profile, #back-icon-profile-text, #back-icon-about-us, #back-icon-about-us-text, #back-icon-contact-us, #back-icon-contact-us-text, #back-icon-shipping, #back-icon-shipping-text').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var currentUserLoggedIn = app.GetCurrentUser();
            $("#user-name").text(currentUserLoggedIn);
            app.MemberCenterDetails();
            $.mobile.changePage('#pgAccount', { transition: pgtransition });
        });

        $('#location-icon, #location-text').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.GetUserSavedAddresses();
            $.mobile.changePage('#pgShippingAddress', { transition: pgtransition });
        });

        // Pop-up Gender Dialog
        $('#loged-in-user-gender').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $('#genderPopupDialog').popup('open');
        });

        // Save Gender
        $('#saveGenderBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var radioValueGender = $("input[name='gender']:checked").val();
            app.UpdateUserGender(radioValueGender);
        });

        // Pop-up Birthday Dialog
        $('#loged-in-user-birthday').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $('#birthdayPopupDialog').popup('open');
        });

        // Save Birthday
        $('#saveBirthdayBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var newBirthday = $("#userBirthDay").val();
            app.UpdateUserBirthday(newBirthday);
        });

        // Pop-up First and Last Name Dialog
        $('#loged-in-user-name').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $('#namePopupDialog').popup('open');
        });

        // Save Pop-up First and Last Name
        $('#saveNameBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var newBirthday = $("#userBirthDay").val();
            app.UpdateUserBirthday(newBirthday);
        });

        // Edit selected Address
        $('#edit-icon').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $('#addressPopupDialog').popup();
            $('#addressPopupDialog').popup('open');
        });

        // Save Editted Address
        $('#saveAddressBtn').on('click', function(e) {
            var selectedAddress = $("input[name='address']:checked").val();
            var editedUserAddress = $("#editSavedAddress").val();
            if (selectedAddress == null) {
                toastr.error('Please select a address to be edited');
            } else {
                app.EditSavedAddress(selectedAddress, editedUserAddress);
            }
        });

        $('#shipping-address-text').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // app.GetUserSavedAddresses();
            var firstAddress = $("#address-one").val();
            var secondAddress = $("#address-two").val();
            if ((firstAddress == null && secondAddress == null) || (firstAddress != null && secondAddress == null)) {
                $('#newAddressPopupDialog').popup();
                $('#newAddressPopupDialog').popup('open');
            } else {
                toastr.error('You can only add two addresses');
            }
        });

        // Save new Address
        $('#newAddressSaveBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.UpdateAddress($('#addNewAddress').val().trim());
            app.GetUserSavedAddresses();
        });

        // Navigate to settings
        $('#settings-icon, #settings-icon-text').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.GetUserSavedAddresses();
            $.mobile.changePage('#pgSettings', { transition: pgtransition });
        });


        app.GetCurrentUser = function() {
            var Email = localStorage.getItem("currentLoggedInUser");
            // var userName = Email.trim();
            // userName = userName.split('@')[0];

            return userName;
        };

        function PopulateCategories(categoryState, categoriesObj) {
            var icnt;
            var count = 0;
            var previousCategoryObj = null;

            if (categoryState == "parent") {
                $.each(categoriesObj.categories, function() {
                    count += 1;
                    var newCategoryObj = appendCategories(this);
                    if (count == 1 && previousCategoryObj === null) {
                        previousCategoryObj = newCategoryObj;
                    }
                    if (count == 2) {
                        appendCategoryParent(categoryState, previousCategoryObj, newCategoryObj);
                        count = 0;
                        previousCategoryObj = null;
                    }
                });
            } else {
                //var myEnum = {FrozenFood: "FrozenFood"};

                $.each(categoriesObj.subCategories, function() {
                    count += 1;
                    var newCategoryObj = appendCategories(this);
                    if (count == 1 && previousCategoryObj === null) {
                        previousCategoryObj = newCategoryObj;
                    }
                    if (count == 2) {
                        appendCategoryParent(categoryState, previousCategoryObj, newCategoryObj);
                        count = 0;
                        previousCategoryObj = null;
                    }
                });
            }
        }

        app.GetCategories = function() {
            // get users
            var fileName = "Categories"
            fileName += '.json';
            var req = Ajax("./controllers/ajaxGetCategories.php?file=" + encodeURIComponent(fileName));
            if (req.status == 200) {
                // parse string to json object
                $('#pgShopContent').empty();
                try {
                    var categoriesObj = JSON.parse(req.responseText);
                    var categoryState = "parent";
                    PopulateCategories(categoryState, categoriesObj);
                } catch (e) {
                    //user file is not found
                    $('#pgLoginIn').data('success', 'false');
                    // toastr.error('This User - ' + userName.split('.')[0] + 'is NOT registered in this App!');
                }
            }
        };

        function appendCategoryParent(categoryState, previousCategoryObj, newCategoryObj) {

            var parentDiv = $('<div>', {
                'style': 'display: flex; margin-bottom: 20px; margin-top: 10px;'
            });

            parentDiv.append(previousCategoryObj);
            parentDiv.append(newCategoryObj);
            if (categoryState == "parent") {
                $('#pgShopContent').append(parentDiv);
            } else {
                $('#sub-category-background').append(parentDiv);
            }
        }

        function appendCategories(dataObj) {

            var parentDiv = $('<div>', {
                'id': dataObj.TopCategoryName + '-category',
                'class': 'category-content'
            });

            var categoryImg = $('<img>', {
                'style': 'width: 160px; height: 90px; margin-top: 7px; border-radius: 10px 10px 10px 10px; margin-left: 5px;',
                'src': dataObj.Path

            });

            var categoryName = $('<p>', {
                'class': 'card-text-font-style',
                'stye': 'left: 262px;'
            });

            categoryName.text(dataObj.TopCategoryName);

            parentDiv.append(categoryImg);
            parentDiv.append(categoryName);

            parentDiv.on('click', function() {
                subCategory(dataObj.TopCategoryName);
                //    $.mobile.changePage('#pgLoginIn', {transition: pgtransition});
            });

            return parentDiv;
        }

        function subCategory(parentCategoryName) {

            var newParentCategoryName = parentCategoryName.replace(/ /g, '');
            // toastr.error('Selected Sub category ' +newParentCategoryName);

            var fileName = newParentCategoryName;
            fileName += '.json';
            var req = Ajax("./controllers/ajaxGetSubCategories.php?file=" + encodeURIComponent(fileName));
            if (req.status == 200) {
                // parse string to json object
                $('#sub-category-background').empty();
                try {
                    var subCategoriesObj = JSON.parse(req.responseText);
                    PopulateCategories(newParentCategoryName, subCategoriesObj);
                } catch (e) {
                    //user file is not found
                    $('#pgLoginIn').data('success', 'false');
                    toastr.error('This User - ' + userName.split('.')[0] + 'is NOT registered in this App!');
                }
            }
            $("#sub-category-name-text").text(parentCategoryName);
            $.mobile.changePage('#pgSubCategory', { transition: pgtransition });
        }

        // function setUserName(userName) {
        //     var newUserName = userName.substr(0, userName.indexOf('.'));
        //     $("#user-name").text(newUserName);
        // }


        ///////////////////////////// Flash Deals Carousel Item Appending /////////////////////////////////////////////////////

        $(document).delegate('.ui-page', 'pageshow', function() {

            $('.fadeOut').owlCarousel({
                items: 1,
                animateOut: 'fadeOut',
                loop: true,
                margin: 10,
            });

            $('.home-carousel').owlCarousel({
                items: 2.5,
                loop: true,
                margin: 0,
            });

            app.GetFlashDealsItems();

            $('#favSelect-button').removeClass('ui-shadow');
            $('#cancelFavouriteBtn').removeClass('ui-shadow');
            $('#deleteFavouriteBtn').removeClass('ui-shadow');

            if ($('#fav-footer').hasClass('slideup')) {
                $('#fav-footer').removeClass("slideup");
            }

            if ($('#fav-header').hasClass('slidedown')) {
                $('#fav-header').removeClass("slidedown");
            }

        });

        app.GetFlashDealsItems = function() {
            var fileName = "FlashDealItemList";
            fileName += '.json';
            var req = Ajax("./controllers/ajaxGetProductTypeLists.php?file=" + encodeURIComponent(fileName));
            if (req.status == 200) {
                try {
                    var flashDealItemsList = JSON.parse(req.responseText);
                    $.each(flashDealItemsList.FlashDealsList, function() {
                        appendFlashDealItems($('#owl-item-parent-div'), this);
                    });
                } catch (e) {
                    toastr.success('An Error Occurred While Retrieving Flash Deals Item List');
                }
            }

        };

        function appendFlashDealItems(parent, dataObj) {

            var parentDiv = $('<div>', {
                'class': 'owl-item',
                'style': 'width: 145px; margin-right: 10px;'
            });

            var carouselItem = $('<div>', {
                'class': 'item flash-deals-carousel-item-margin'
            });

            var carouselDiv = $('<div>', {
                'style': 'background: #FFFFFF; height: 80px !important; display: flex; border-radius: 20px;'
            });

            var flashDealItem = $('<img>', {
                'src': dataObj.Path,
                'style': 'width: 55px !important; height: 55px !important; margin-top: 15px; margin-left: 7px;'
            });

            var flashDealDetailsDiv = $('<div>', {
                'style': 'display: grid; margin-left: 4px;'
            });

            var flashDealPercentageImg = $('<img>', {
                'src': dataObj.Flash_Deal_Image,
                'style': 'width: 56px !important; height: 32px !important; margin-top: 5px; margin-left: 2px;'
            });

            var previousPriceSpan = $('<span>', {
                'style': 'font-size: 11px; font-weight: 600;'
            });

            previousPriceSpan.text("Was : " + dataObj.Price);

            var nowPriceSpan = $('<span>', {
                'style': 'font-size: 11px; font-weight: 600; margin-top: -5px;'
            });

            nowPriceSpan.text("Now : " + dataObj.Discount_Price);

            flashDealDetailsDiv.append(flashDealPercentageImg);
            flashDealDetailsDiv.append(previousPriceSpan);
            flashDealDetailsDiv.append(nowPriceSpan);

            carouselDiv.append(flashDealItem);
            carouselDiv.append(flashDealDetailsDiv);

            carouselItem.append(carouselDiv);

            parentDiv.append(carouselItem);

            jQuery("#home-carousel-div").trigger('add.owl.carousel', parentDiv).trigger('refresh.owl.carousel');

        }

        ///////////////////////////// Address Appending /////////////////////////////////////////////////////

        app.GetUserSavedAddresses = function() {
            var loggedInUser = app.GetCurrentUser();
            loggedInUser += '.json';
            var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(loggedInUser));
            if (req.status == 200) {
                try {
                    var addressObject = JSON.parse(req.responseText);
                    $('#existing-addresses').empty();

                    if (addressObject.AddressOne == null || addressObject.AddressOne == "") {
                        $('#address-one-container').hide();
                        $('#address-two-container').hide();
                        $('#address-one-radio').hide();
                        $('#address-two-radio').hide();
                    }
                    if (addressObject.AddressOne != null && (addressObject.AddressTwo == null || addressObject.AddressTwo == "")) {
                        $('#address-two-container').hide();
                        $('#address-two-radio').hide();
                    }

                    $("#address-one").text(addressObject.AddressOne);
                    $("#address-two").text(addressObject.AddressTwo);

                } catch (e) {

                }
            }
        };

        app.MemberCenterDetails = function() {
            var loggedInUser = app.GetCurrentUser();
            loggedInUser += '.json';
            var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(loggedInUser));
            if (req.status == 200) {
                try {
                    var addressObject = JSON.parse(req.responseText);
                    if ((addressObject.LoyaltyPoints >= 0 && LoyaltyPoints <= 75) || addressObject.LoyaltyPoints == null) {
                        $("#loged-in-member-center").text("Silver Member");
                        $("#member-center-icon").attr("src", "./assets/img/Member_Types/silver_crown.png");
                        $("#member-type").text("Silver Member");
                        $("#crown-membership").attr("src", "./assets/img/Member_Types/silver_crown.png");
                    }
                    if (addressObject.LoyaltyPoints >= 75 && addressObject.LoyaltyPoints <= 200) {
                        $("#loged-in-member-center").text("Gold Member");
                        $("#member-center-icon").attr("src", "./assets/img/Member_Types/gold_crown.png");
                        $("#member-type").text("Gold Member");
                        $("#crown-membership").attr("src", "./assets/img/Member_Types/gold_crown.png");
                    }
                    if (addressObject.LoyaltyPoints >= 200 && addressObject.LoyaltyPoints <= 400) {
                        $("#loged-in-member-center").text("Platinum Member");
                        $("#member-center-icon").attr("src", "./assets/img/Member_Types/platinum_crown.png");
                        $("#member-type").text("Platinum Member");
                        $("#crown-membership").attr("src", "./assets/img/Member_Types/platinum_crown.png");
                    }
                    if (addressObject.LoyaltyPoints >= 400 && (addressObject.LoyaltyPoints <= 600 || addressObject.LoyaltyPoints > 600)) {
                        $("#loged-in-member-center").text("Diamond Member");
                        $("#member-center-icon").attr("src", "./assets/img/Member_Types/diamond_crown.png");
                        $("#member-type").text("Diamond Member");
                        $("#crown-membership").attr("src", "./assets/img/Member_Types/diamond_crown.png");
                    }
                } catch (e) {

                }
            }
        };

        app.PopulateAllBacisInfo = function() {
            var Email = localStorage.getItem("currentLoggedInUser");
            var userName = Email.trim();
            $("#loged-in-account-info").text(userName);

            var loggedInUser = app.GetCurrentUser();
            loggedInUser += '.json';
            var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(loggedInUser));
            if (req.status == 200) {
                try {
                    var addressObject = JSON.parse(req.responseText);
                    if (addressObject.BirthDay != null) {
                        $("#loged-in-user-birthday").text(addressObject.BirthDay);
                    }
                    if (addressObject.Name != null) {
                        if (addressObject.FirstName == null && addressObject.LastName == null) {
                            var currentUser = app.GetCurrentUser();
                            $("#loged-in-user-name").text(currentUser);
                        } else {
                            var fullName = addressObject.FirstName + " " + addressObject.LastName;
                            $("#loged-in-user-name").text(fullName);
                        }
                    }
                    if (addressObject.BirthDay == null || addressObject.BirthDay == "") {
                        $("#loged-in-user-birthday").text("Add");
                    } else {
                        $("#loged-in-user-birthday").text(addressObject.BirthDay);
                    }
                    if (addressObject.UserGender == null || addressObject.UserGender == "") {
                        $("#loged-in-user-gender").text("Add");
                    } else {
                        $("#loged-in-user-gender").text(addressObject.UserGender);
                    }
                } catch (e) {

                }
            }
        };

        app.UpdateUserGender = function(gender) {
            var loggedInUser = app.GetCurrentUser();
            loggedInUser += '.json';
            var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(loggedInUser));
            if (req.status == 200) {
                try {
                    var object = JSON.parse(req.responseText);
                    if (gender != null) {
                        object.UserGender = gender
                    }
                    var recordJSON = JSON.stringify(object);
                    var reqe = Ajax("./controllers/ajaxSaveCustomer.php", "POST", recordJSON);
                    if (reqe.status == 200) {
                        try {
                            app.PopulateAllBacisInfo();
                            app.MemberCenterDetails();
                            $.mobile.changePage('#pgEditAccount', { transition: pgtransition });
                        } catch (e) {}
                    }
                } catch (e) {}
            }
        };

        app.UpdateUserBirthday = function(birthday) {
            var loggedInUser = app.GetCurrentUser();
            loggedInUser += '.json';
            var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(loggedInUser));
            if (req.status == 200) {
                try {
                    var object = JSON.parse(req.responseText);
                    if (birthday != null) {
                        object.BirthDay = birthday
                    }
                    var recordJSON = JSON.stringify(object);
                    var reqe = Ajax("./controllers/ajaxSaveCustomer.php", "POST", recordJSON);
                    if (reqe.status == 200) {
                        try {
                            app.PopulateAllBacisInfo();
                            app.MemberCenterDetails();
                            $.mobile.changePage('#pgEditAccount', { transition: pgtransition });
                        } catch (e) {}
                    }
                } catch (e) {}
            }
        };

        app.UpdateUserNames = function(fName, lName, defaultName) {
            var loggedInUser = app.GetCurrentUser();
            loggedInUser += '.json';
            var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(loggedInUser));
            if (req.status == 200) {
                try {
                    var object = JSON.parse(req.responseText);
                    object.FirstName = null;
                    object.LastName = null;
                    if (fName == null && lName == null) {
                        object.Name = defaultName
                    } else {
                        object.FirstName = fName;
                        object.LastName = lName;
                    }
                    var recordJSON = JSON.stringify(object);
                    var reqe = Ajax("./controllers/ajaxSaveCustomer.php", "POST", recordJSON);
                    if (reqe.status == 200) {
                        try {
                            app.PopulateAllBacisInfo();
                            app.MemberCenterDetails();
                            $.mobile.changePage('#pgEditAccount', { transition: pgtransition });
                        } catch (e) {}
                    }
                } catch (e) {}
            }
        };

        app.EditSavedAddress = function(selectedAddress, editedAddress) {
            var loggedInUser = app.GetCurrentUser();
            loggedInUser += '.json';
            var req = Ajax("./controllers/ajaxGetCustomer.php?file=" + encodeURIComponent(loggedInUser));
            if (req.status == 200) {
                try {
                    var object = JSON.parse(req.responseText);
                    if (selectedAddress == null) {
                        toastr.success('Please select the address which needs to be edited');
                    } else {
                        if (selectedAddress == "first-address" && editedAddress != null) {
                            if (editedAddress == "") {
                                object.AddressOne = null;
                            } else {
                                object.AddressOne = editedAddress;
                            }
                        }
                        if (selectedAddress == "second-address") {
                            if (editedAddress == "") {
                                object.AddressTwo = null;
                            } else {
                                object.AddressTwo = editedAddress;
                            }
                        }
                    }
                    var recordJSON = JSON.stringify(object);
                    var reqe = Ajax("./controllers/ajaxSaveCustomer.php", "POST", recordJSON);
                    if (reqe.status == 200) {
                        try {
                            app.GetUserSavedAddresses();
                            $.mobile.changePage('#pgShippingAddress', { transition: pgtransition });
                        } catch (e) {}
                    }
                } catch (e) {

                }
            }
        };


        ///////////////////////////// Flash Deals List View Item Appending /////////////////////////////////////////////////////


        app.GetFlashDealsListItems = function() {
            var fileName = "FlashDealItemList";
            fileName += '.json';
            var req = Ajax("./controllers/ajaxGetProductTypeLists.php?file=" + encodeURIComponent(fileName));
            if (req.status == 200) {
                try {
                    var flashDealItemsList = JSON.parse(req.responseText);
                    var count = 0;
                    var previousFlashDealsColumnObj = null;
                    $('#flashDealsParentDiv').empty();

                    $.each(flashDealItemsList.FlashDealsList, function() {

                        count += 1;
                        var newFlashDealsColumnObj = appendFlashDealItemsToList(this);

                        if (count == 1 && previousFlashDealsColumnObj === null) {
                            previousFlashDealsColumnObj = newFlashDealsColumnObj;
                        }

                        if (count == 2) {
                            appendFlashDealsColumnsParent($('#flashDealsParentDiv'), previousFlashDealsColumnObj, newFlashDealsColumnObj);
                            count = 0;
                            previousFlashDealsColumnObj = null;
                        }

                    });
                } catch (e) {
                    toastr.success('An Error Occurred While Retrieving Flash Deals Item List');
                }
            }

        };

        function appendFlashDealsColumnsParent(parent, prevFlashDealsColumnObj, newFlashDealsColumnObj) {

            var flashDealsRow = $('<div>', {
                'class': 'flashDealsRow'
            });

            flashDealsRow.append(prevFlashDealsColumnObj);
            flashDealsRow.append(newFlashDealsColumnObj);

            parent.append(flashDealsRow);
        }

        function appendFlashDealItemsToList(dataObj) {

            var flashDealsColumn = $('<div>', {
                'id': dataObj.Product_ID,
                'class': 'flashDealsColomn',
                'product-type': dataObj.Product_Type
            });

            var flashDealsItemImg = $('<img>', {
                'style': 'height: 100px; width: 100px;',
                'src': dataObj.Path
            });

            var flashDealsItemDetailsDiv = $('<div>', {
                'style': 'display: grid; padding: 5px;'
            });

            var flashDealsItemName = $('<span>', {
                'class': 'flash-deals-item-details'
            });

            flashDealsItemName.text(dataObj.Product_Name);

            var flashDealsItemDiscountPrice = $('<span>', {
                'class': 'flash-deals-price'
            });

            flashDealsItemDiscountPrice.text(dataObj.Discount_Price);

            var flashDealsItemPrice = $('<span>', {
                'class': 'flash-deals-discount-price'
            });

            flashDealsItemPrice.text(dataObj.Price + " | " + dataObj.Discount_Percentage);

            flashDealsItemDetailsDiv.append(flashDealsItemName);
            flashDealsItemDetailsDiv.append(flashDealsItemDiscountPrice);
            flashDealsItemDetailsDiv.append(flashDealsItemPrice);

            flashDealsColumn.append(flashDealsItemImg);
            flashDealsColumn.append(flashDealsItemDetailsDiv);

            return flashDealsColumn;

            // ROUTE TO FLASH DEAL ITEM PAGE - TODO
            flashDealsColumn.on('click', function() {

            });
        }


        ///////////////////////////// Top Selection and New Products List View Item Appending /////////////////////////////////////////////////////


        app.GetTopSelectionOrNewProductsListItems = function(categoryType) {
            var fileName, parent;
            if (categoryType == "NewProducts") {
                fileName = "NewProductsItemList";
                parent = $('#newProductsParentDiv');
            } else {
                fileName = "TopSelectionItemList";
                parent = $('#topSelectionParentDiv');
            }

            fileName += '.json';
            var req = Ajax("./controllers/ajaxGetProductTypeLists.php?file=" + encodeURIComponent(fileName));
            if (req.status == 200) {
                try {
                    var itemsList = JSON.parse(req.responseText);
                    var count = 0;
                    var previousColumnObj = null;
                    parent.empty();
                    if (categoryType == "NewProducts") {
                        $.each(itemsList.NewProductsList, function() {

                            count += 1;
                            var newColumnObj = appendItemsToList(this);

                            if (count == 1 && previousColumnObj === null) {
                                previousColumnObj = newColumnObj;
                            }

                            if (count == 2) {
                                appendItemsToColumnsParent(parent, previousColumnObj, newColumnObj);
                                count = 0;
                                previousColumnObj = null;
                            }

                        });
                    } else if (categoryType == "TopSelection") {
                        $.each(itemsList.TopSelectionList, function() {

                            count += 1;
                            var newColumnObj = appendItemsToList(this);

                            if (count == 1 && previousColumnObj === null) {
                                previousColumnObj = newColumnObj;
                            }

                            if (count == 2) {
                                appendItemsToColumnsParent(parent, previousColumnObj, newColumnObj);
                                count = 0;
                                previousColumnObj = null;
                            }

                        });
                    }
                } catch (e) {
                    toastr.success('An Error Occurred While Retrieving Product Type Item List');
                }
            }

        };

        function appendItemsToColumnsParent(parent, prevColumnObj, newColumnObj) {

            var itemsRow = $('<div>', {
                'class': 'flashDealsRow'
            });

            itemsRow.append(prevColumnObj);
            itemsRow.append(newColumnObj);

            parent.append(itemsRow);
        }

        function appendItemsToList(dataObj) {

            var itemListColumn = $('<div>', {
                'id': dataObj.Product_ID,
                'class': 'productTypesColomn',
                'product-type': dataObj.Product_Type
            });

            var itemImageParentDiv = $('<div>', {
                'style': 'display: flex; margin-left: 10%;'
            });

            var itemsImg = $('<img>', {
                'style': 'height: 100px; width: 100px;',
                'src': dataObj.Path
            });

            var itemProductTypeImg = $('<img>', {
                'style': 'height: 35px; width: 35px; margin-left: -5px;margin-top: 5px;',
                'src': dataObj.Product_Type_Image
            });

            itemImageParentDiv.append(itemsImg);
            itemImageParentDiv.append(itemProductTypeImg);

            var itemDetailsDiv = $('<div>', {
                'style': 'display: grid; padding: 15px;'
            });

            var itemName = $('<span>', {
                'class': 'flash-deals-item-details'
            });

            itemName.text(dataObj.Product_Name);

            var itemPrice = $('<span>', {
                'class': 'flash-deals-price'
            });

            itemPrice.text(dataObj.Price);

            itemDetailsDiv.append(itemName);
            itemDetailsDiv.append(itemPrice);

            itemListColumn.append(itemImageParentDiv);
            itemListColumn.append(itemDetailsDiv);

            return itemListColumn;

            // ROUTE TO TOP SELECTION OR NEW PRODUCT ITEM PAGE - TODO
            itemListColumn.on('click', function() {

            });
        }


        ///////////// Favourite Selector OnChange Event //////////////////////////////////////////////////////////////

        $('#favSelect').change(function() {
            var selectedValue = null;
            var selectedoptions = $(this).find('option:selected');
            if (selectedoptions != undefined) {
                selectedValue = selectedoptions.val();
                favouritesSelectorValue = selectedoptions.val();
                if (favouritesSelectorValue == "ALL_PRODUCTS") {
                    //var currentLoggedUser = localStorage.getItem("currentLoggedInUser");
                    var currentLoggedUser = "User_001";
                    app.GetFavouriteListForUser(currentLoggedUser, favouritesSelectorValue);
                    getFavouriteListsForUser();
                    $('#favouriteItemListDiv').css('display', 'block');
                    $('#favouriteListParentDiv').empty();
                    $('#favouriteListParentDiv').css('display', 'none');
                    $('#createFavListBtn').css('display', 'none');
                    $('#favSelect').css('width', '80%');
                } else {
                    $('#favSelect').empty();
                    $('#favouriteItemListDiv').empty();
                    $('#favouriteListParentDiv').empty();
                    $('#favouriteItemListDiv').css('display', 'none');
                    $('#favouriteListParentDiv').css('display', 'block');
                    $('#createFavListBtn').remove();
                    var favouriteLists = getFavouriteLists();
                    $.each(favouriteLists.FavouriteLists, function(index) {
                        var parent = $('#favouriteListParentDiv');
                        appendFavouriteListsToParent(parent, this, index);
                    });

                    var favouriteListOptionAllProducts = $('<option>', {
                        'style': 'color: #333 !important; font-size: 9px !important;',
                        'value': 'ALL_PRODUCTS'
                    });
                    favouriteListOptionAllProducts.text("ALL PRODUCTS");

                    var favouriteListOptionParent = $('<option>', {
                        'style': 'color: #333 !important; font-size: 9px !important;',
                        'value': 'MY_LISTS'
                    });
                    favouriteListOptionParent.text("MY LISTS");

                    $('#favSelect').css('width', '100%');

                    $('#favSelect').append(favouriteListOptionParent);
                    $('#favSelect').append(favouriteListOptionAllProducts);

                    var createFavBtn = $('<button>', {
                        'id': 'createFavListBtn',
                        'class': 'ui-btn-fab ui-btn-raised ui-btn ui-btn-inline waves-effect waves-button waves-effect waves-button',
                        'style': 'position: absolute; display: block; right: 3%; width: 40px; top: -100%; border: 0.2px solid rgba(0, 0, 0, 0.8); box-sizing: border-box !important; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25) !important;'
                    }).on('click', function() {
                        $('#createNewFavListPopupDialog').popup('open');
                    });

                    var createFavBtnIcon = $('<i>', {
                        'class': 'zmdi zmdi-plus zmd-2x',
                        'style': 'color: rgba(227, 9, 9, 0.9);'
                    });

                    createFavBtn.append(createFavBtnIcon);

                    $('#fav-footer').append(createFavBtn);
                }
            }
        });

        ///////////////////////////////////// Edit Button View /////////////////////////////////////////

        function editBtnFunctionalities() {
            var X = 1;
            var Y = 0;
            var Z = 7;
            $('.edit-check-box').css('display', 'none');
            $('#edit-btn').attr('src', './assets/img/Navbar_Images/edit-black.png');
            $('#favEditNavBar').css('display', 'none');
            $('#favNavBar').css('display', 'block');
            $('#fav-footer').css('border-width', X + 'px ' + Y + 'px');
            $('#fav-footer').css('padding-top', Z + 'px');
            deleteFavouriteItemsList = [];
            moveFavouriteItemsList = [];
            $('input:checkbox').removeAttr('checked');
        }

        function correctBtnFunctionalities() {
            var X = 2;
            var Y = 0;
            $('.edit-check-box').css('display', 'block');
            $('#edit-btn').attr('src', './assets/img/Navbar_Images/correct-signal.png');
            $('#favNavBar').css('display', 'none');
            $('#favEditNavBar').css('display', 'block');
            $('#fav-footer').css('border-width', X + 'px ' + Y + 'px');
            $('#fav-footer').css('padding-top', Y + 'px');
        }

        $('#edit-btn').on('click', function() {
            if ($('#edit-btn').attr('src') == './assets/img/Navbar_Images/correct-signal.png') {
                editBtnFunctionalities();
            } else {
                correctBtnFunctionalities();
            }
        });

        //////////////////////// Get Favourite List According To User //////////////////////////////

        app.GetFavouriteListForUser = function(currentLoggedUser, favouritesSelectorValue) {

            if (favouritesSelectorValue == "REDUCED_PRICE_PRODUCTS" || "ALL_PRODUCTS" || null) {
                favouritesSelectorValue = "defaultFavouriteList"
            }
            currentLoggedUser = "User_001";
            var fileName = currentLoggedUser + "-" + favouritesSelectorValue;
            fileName += '.json';
            var req = Ajax("./controllers/ajaxGetFavouriteLists.php?file=" + encodeURIComponent(fileName));
            if (req.status == 200) {
                try {
                    var favouriteItemsList = JSON.parse(req.responseText);
                    $('#favouriteItemListDiv').empty();
                    $.each(favouriteItemsList.FavouriteItemList, function() {
                        appendFavouriteItemsToList($('#favouriteItemListDiv'), this);
                    });
                } catch (e) {
                    toastr.success('An Error Occurred While Retrieving Favourite Item List');
                }
            }

        };

        //////////////////////// Append Favourite List Items To List //////////////////////////////

        function appendFavouriteItemsToList(parent, dataObj) {

            var itemFavouriteListRow = $('<div>', {
                'id': dataObj.Product_ID,
                'border-bottom': '1px #C4C4C4 solid;',
                'class': 'flashDealsRow',
                'style': 'margin-bottom: 15px; margin-top: 15px;'
            });

            var itemFavouriteImageParentDiv = $('<div>', {
                'style': 'display: flex; margin-left: 5%;'
            }).on('click', function() {
                alert(dataObj.Product_ID + "ITEM CLICKED");
            });

            var itemFavouriteImg = $('<img>', {
                'style': 'height: 90px; width: 90px;',
                'src': dataObj.Path
            });

            itemFavouriteImageParentDiv.append(itemFavouriteImg);

            var itemFavouriteDetailsParentDiv = $('<div>', {
                'style': 'display: grid; padding: 15px; margin-bottom: 5px; margin-left: 10px;'
            });

            var itemFavouriteName = $('<span>', {
                'class': 'flash-deals-item-details'
            }).on('click', function() {
                alert(dataObj.Product_ID + "ITEM CLICKED");
            });

            itemFavouriteName.text(dataObj.Product_Name);

            var itemFavouriteEditCheckBox = $('<input>', {
                'type': 'checkbox',
                'class': 'edit-check-box',
                'id': 'edit-check-box-' + dataObj.Product_ID,
                'style': ' height: 30px; width: 20px; display: none; margin-left: 90%; margin-bottom: -15%;'
            }).on('change', function(e) {
                if ($(this).is(':checked')) {
                    var selectedId = this.id.split('-')[3];
                    deleteFavouriteItemsList.push(selectedId);
                    moveFavouriteItemsList.push(selectedId);
                } else {
                    var selectedId = this.id.split('-')[3];
                    deleteFavouriteItemsList = jQuery.grep(deleteFavouriteItemsList, function(value) {
                        return value != selectedId;
                    });

                    moveFavouriteItemsList = jQuery.grep(moveFavouriteItemsList, function(value) {
                        return value != selectedId;
                    });
                }
            });

            var myVar = setInterval(myTimer, 5);

            function myTimer() {
                if ($('#fav-header').hasClass('ui-fixed-hidden')) {
                    $('#fav-header').removeClass("ui-fixed-hidden");
                    $('#fav-header').removeClass("slidedown");
                }
                if ($('#fav-footer').hasClass('ui-fixed-hidden')) {
                    $('#fav-footer').removeClass("ui-fixed-hidden");
                    $('#fav-footer').removeClass("slideup");
                }
            }

            var itemFavouritePrice = $('<span>', {
                'class': 'flash-deals-price'
            });

            itemFavouritePrice.text(dataObj.Price);

            var itemFavouriteRatingParentDiv = $('<div>', {
                'style': 'display: flex; margin-top: 7px; margin-left: 2px;'
            });

            var itemFavouriteRating = $('<span>', {
                'class': 'favourites-rating'
            });

            itemFavouriteRating.text(dataObj.Product_Rating + ".0");

            var itemFavouriteImgRating = $('<img>', {
                'style': 'height: 15px; width: 15px; margin-left: 5px;',
                'src': './assets/img/starRating.png'
            });

            itemFavouriteRatingParentDiv.append(itemFavouriteRating);
            itemFavouriteRatingParentDiv.append(itemFavouriteImgRating);

            var contextMenuParentDiv = $('<img>', {
                'class': 'contextMenu iw-mTrigger',
                'style': 'height: 18px; width: 18px; transform: rotate(90deg);',
                'src': ' ./assets/img/menu.png',
                'id': 'context-menu-' + dataObj.Product_ID + "-" + dataObj.Product_Name,
                'product-name': dataObj.Product_Name
            }).on('click', function() {
                selectedItemId = this.id.split('-')[2];
                selectedItemName = this.id.split('-')[3].trim();
            });

            var menu = [{
                name: 'Move to',
                fun: function(data, event) {
                    $('#movePopupDialog').popup('open');
                    moveFavouriteItemsList.push(selectedItemId);
                    getFavouriteListsForUser();
                }
            }, {
                name: 'Delete',
                fun: function(data, event) {
                    deleteFavouriteItemsList.push(selectedItemId);
                    $('#deletePopupDialog').popup('open');
                }
            }, {
                name: 'Share via E-mail',
                fun: function(data, event) {
                    shareFavouriteItem = {
                        'productId': selectedItemId,
                        'productName': selectedItemName
                    };
                    $('#sharePopupDialog').popup('open');
                    $('#cancelFavouriteBtn').removeClass('ui-shadow');
                    $('#shareFavouriteBtn').removeClass('ui-shadow');

                }
            }];

            $('.contextMenu').contextMenu(menu);

            var itemFavouriteContextMenu = $('<div>', {
                'style': 'text-align: end; margin-top: 10px; margin-right: 5px;',
                'class': 'context-menu'
            });

            itemFavouriteContextMenu.append(contextMenuParentDiv);

            itemFavouriteDetailsParentDiv.append(itemFavouriteName);
            itemFavouriteDetailsParentDiv.append(itemFavouriteEditCheckBox);
            itemFavouriteDetailsParentDiv.append(itemFavouritePrice);
            itemFavouriteDetailsParentDiv.append(itemFavouriteRatingParentDiv);
            itemFavouriteDetailsParentDiv.append(itemFavouriteContextMenu);

            itemFavouriteListRow.append(itemFavouriteImageParentDiv);
            itemFavouriteListRow.append(itemFavouriteDetailsParentDiv);

            parent.append(itemFavouriteListRow);
        }

        ////////////////////////// Remove Favourite From List //////////////////////////////////////

        function deleteFavouriteItems(deleteFavouriteItemsList) {
            deleteFavouriteItemsList.forEach(element => {
                $('#favouriteItemListDiv').find("div#" + element).remove();

                if (favouritesSelectorValue == "REDUCED_PRICE_PRODUCTS" || "ALL_PRODUCTS" || null) {
                    favouritesSelectorValue = "defaultFavouriteList";
                }
                currentLoggedUser = "User_001";
                var fileName = currentLoggedUser + "-" + favouritesSelectorValue;
                fileName += '.json';
                var req = Ajax("./controllers/ajaxGetFavouriteLists.php?file=" + encodeURIComponent(fileName));
                if (req.status == 200) {
                    try {
                        var favouriteItemsList = JSON.parse(req.responseText);
                        $.each(favouriteItemsList.FavouriteItemList, function(index, val) {
                            if (this.Product_ID === element) {
                                delete favouriteItemsList.FavouriteItemList[index];
                            }
                        });
                        var updatedFileName = currentLoggedUser + "-" + favouritesSelectorValue;
                        updateFavouriteList(favouriteItemsList, updatedFileName);
                    } catch (e) {
                        toastr.success('An Error Occurred While Retrieving Favourite Item List');
                    }
                }
                deleteFavouriteItemsList = [];
                $('#deletePopupDialog').popup('close');
            });
        }

        ////////////////////////// Delete Popup Show Method /////////////////////////////////////////////////////

        $('#favDeleteItemsBtn').on('click', function() {
            $('#deletePopupDialog').popup('open');
        });

        ////////////////////////// Delete Multiple Items Once /////////////////////////////////////////////////////

        $('#deleteFavouriteBtn').on('click', function() {
            deleteFavouriteItems(deleteFavouriteItemsList);
            editBtnFunctionalities();
        });

        /////////////////////////// Move Item To New Favourite Lists ////////////////////////////////////////////////

        $('#favMoveToBtn').on('click', function() {
            ////////////////////////// Move Popup need to add --- TODO //////////////////////////////////////
            $('#movePopupDialog').popup('open');
        });

        ////////////////////////// Update Favourite Items List //////////////////////////////////////////////////////

        function updateFavouriteList(updatedFavouriteList, fileName) {
            updatedFavouriteList.FavouriteItemList.FileName = fileName;
            var recordJSON = JSON.stringify(updatedFavouriteList);
            var req = Ajax("./controllers/ajaxSaveFavouriteList.php", "POST", recordJSON);
            if (req.status == 200) {} else {
                toastr.success('An Error Occurred While Deleting Item');
                $('#deletePopupDialog').popup('close');
            }
        };


        //////////// Share Favourite From List //////////////////////////////////////

        function shareFavouriteItems(shareFavouriteItemsList) {
            shareFavouriteItemsList.forEach(element => {
                $('#favouriteItemListDiv').find("div#" + element.Product_ID).remove();
                shareFavouriteItemsList = [];
            });
        }

        $('#shareFavouriteBtn').on('click', function() {
            if ($('#shareSubmitSpan').text() == "NEXT") {
                var sEmail = $('#shareFavouriteViaEmail').val();
                var itemURL = window.location.href.split('&')[0] + "?productId=" + shareFavouriteItem.productId;
                if ($.trim(sEmail).length == 0) {
                    $('#invalidEmailSpan').css('display', 'block');
                } else {
                    if (validateEmail(sEmail)) {
                        $('#invalidEmailSpan').css('display', 'none');
                        $('#shareContentSpan').text("Attached favourite item name");
                        $('#shareContentSpan').css('padding', '37px');
                        $('#shareContentSpan').css('margin-left', '-15px');
                        $('input#shareFavouriteViaEmail').val(shareFavouriteItem.productName);

                        ////////////// Send Mail To Using Product Id and Name /////////////////////////////////
                        recordJSON = {
                            'Email': sEmail,
                            'ItemURL': itemURL
                        }
                        var recordJSON = JSON.stringify(recordJSON);
                        localStorage.setItem("shareItemDetails", recordJSON);
                    } else {
                        $('#invalidEmailSpan').css('display', 'block');
                    }

                }
            }

            if ($('#shareSubmitSpan').text() == "SEND") {
                var recordJSON = localStorage.getItem("shareItemDetails");
                var req = Ajax("./controllers/ajaxShareItem.php", "POST", recordJSON);
                if (req.status == 200) {
                    try {
                        toastr.success('Item Shared To Your - ' + sEmail + ' Address');
                        $('#sharePopupDialog').popup('close');
                    } catch (e) {
                        toastr.error('An Error Occured While Sharing Item');
                    }
                }
            }
            $('#shareSubmitSpan').text("SEND");
        });

        $('#add-img').on('click', function() {
            $('#movePopupDialog').popup('close');
        });

        $("#movePopupDialog").bind({
            popupafterclose: function(event, ui) {
                if (moveFavouriteItemsList.length > 0) {
                    $('#createNewFavListPopupDialog').popup('open');
                }
            }
        });

        $('#cancelMoveFavouriteBtn', function() {
            $.mobile.changePage('#pgFavourites');
            moveFavouriteItemsList = [];
        });

        $("#sharePopupDialog").bind({
            popupafterclose: function(event, ui) {
                $('#shareFavouriteViaEmail').val('');
                $('#invalidEmailSpan').css('display', 'none');
            }
        });

        function getFavouriteListsForUser() {
            //var currentLoggedUser = localStorage.getItem('currentLoggedInUser').split('@')[0];
            var currentLoggedUser = "User_001";
            var fileName = currentLoggedUser + "-favouriteLists";
            fileName += '.json';
            var req = Ajax("./controllers/ajaxGetFavouriteLists.php?file=" + encodeURIComponent(fileName));
            if (req.status == 200) {
                try {
                    var favouriteItemsList = JSON.parse(req.responseText);
                    $('#favouriteListSelectionDiv').empty();
                    $('#favSelect').empty();

                    var favouriteListOptionParent = $('<option>', {
                        'style': 'color: #333 !important; font-size: 9px !important;',
                        'value': 'ALL_PRODUCTS'
                    });
                    favouriteListOptionParent.text("ALL PRODUCTS");
                    $('#favSelect').append(favouriteListOptionParent);

                    $.each(favouriteItemsList.FavouriteLists, function(index, val) {
                        appendFavouriteListsToDialog($('#favouriteListSelectionDiv'), val.Name);
                    });

                    appendToListNames($('#favSelect'), 'MY LISTS');

                } catch (e) {
                    toastr.error('An Error Occurred While Retrieving Favourite Lists');
                }
            }
            $("#Default_Favourite_List").prop("checked", true);
        }


        function appendFavouriteListsToDialog(parent, favouriteListName) {

            var radioBtnId = favouriteListName;

            var favouriteListParentDiv = $('<div>', {
                'style': 'display: flex; margin-bottom: 20px; width: 100%'
            });

            var favouriteListVisibilityImg = $('<img>', {
                'class': 'visibility-img',
                'src': './assets/img/Navbar_Images/visibility.png'
            });

            var favouriteListTitleSpan = $('<span>', {
                'class': 'popup-content',
                'style': 'margin-left: 10px; margin-right: 10px;'
            });
            favouriteListName = favouriteListName.replace(/[^a-z0-9\s]/gi, ' ');
            favouriteListTitleSpan.text(favouriteListName);

            var favouriteListInput = $('<input>', {
                'type': 'radio',
                'class': 'radio-btn',
                'id': radioBtnId,
                'style': 'height: 25px; width: 25px; margin-top: -1px; right: 8%;  position: absolute;'
            }).on('change', function() {
                if ($(this).is(':checked')) {
                    $('.radio-btn').prop("checked", false);
                    $("#" + radioBtnId).prop("checked", true);
                    selectedFavouriteListName = $(this).attr('id');
                }
            });

            favouriteListParentDiv.append(favouriteListVisibilityImg);
            favouriteListParentDiv.append(favouriteListTitleSpan);
            favouriteListParentDiv.append(favouriteListInput);

            parent.append(favouriteListParentDiv);

        }

        /////////// Get Default Favourite List Item Details //////////////////////////

        function getDefaultFavouriteListItems(moveFavouriteItemsList) {
            //var currentLoggedUser = localStorage.getItem('currentLoggedInUser').split('@')[0];
            var currentLoggedUser = "User_001";
            var fileName = currentLoggedUser + "-defaultFavouriteList";
            var req = Ajax("./controllers/ajaxGetFavouriteLists.php?file=" + encodeURIComponent(fileName));
            if (req.status == 200) {
                try {
                    var favouriteItemsList = JSON.parse(req.responseText);
                    $.each(favouriteItemsList.FavouriteItemList, function(index, val) {
                        $.each(moveFavouriteItemsList, function(val) {
                            if (val.Product_ID != val) {
                                delete favouriteItemsList.FavouriteItemList[index];
                            }
                        });
                    });
                } catch (e) {
                    toastr.error('An Error Occurred While Converting Default Favourite Lists To JSON');
                }
            } else {
                toastr.error('An Error Occurred While Retrieving Default Favourite Lists');
            }
            return favouriteItemsList;
        }


        $('#moveFavouriteBtn').on('click', function() {
            if (moveFavouriteItemsList.length > 0) {
                var favouriteListName = selectedFavouriteListName.replace(/ /g, '_');
                //var currentLoggedUser = localStorage.getItem('currentLoggedInUser').split('@')[0];
                var currentLoggedUser = "User_001";
                var fileName = currentLoggedUser + "-favouriteLists";
                fileName += '.json';
                var validFavouriteListName = true;
                var req = Ajax("./controllers/ajaxGetFavouriteLists.php?file=" + encodeURIComponent(fileName));
                if (req.status == 200) {
                    try {
                        var favouriteItemsList = JSON.parse(req.responseText);
                        $.each(favouriteItemsList.FavouriteLists, function(index, val) {
                            if (val.Name == favouriteListName) {
                                var fileName = val.FileName;
                                var req = Ajax("./controllers/ajaxGetFavouriteLists.php?file=" + encodeURIComponent(fileName));
                                if (req.status == 200) {
                                    try {
                                        var favouriteItemsList = JSON.parse(req.responseText);
                                        var updatedFavouriteList = getDefaultFavouriteListItems(moveFavouriteItemsList);
                                        var newFavouriteList = favouriteItemsList.FavouriteItemList.push(updatedFavouriteList.FavouriteItemList);
                                        updateFavouriteListWithNewItems(updatedFavouriteList, fileName);

                                        ////////// Logic to Move Items to New List //////////////////////////

                                        ///////// Route to new page and update the selector /////////////

                                    } catch (e) {

                                    }
                                }
                            } else {
                                validFavouriteListName = false;
                            }
                        });

                    } catch (e) {
                        toastr.error('An Error Occurred While Retrieving Favourite Lists');
                    }
                }
            }
        });


        $('#createFavouriteListBtn').on('click', function() {
            var newFavouriteListName = $('#createFavouriteListName').val();
            if (newFavouriteListName.length > 0) {
                //var currentLoggedUser = localStorage.getItem('currentLoggedInUser').split('@')[0];
                var currentLoggedUser = "User_001";
                var fileName = currentLoggedUser + "-favouriteLists";
                fileName += '.json';
                var validFavouriteListName = true;
                var req = Ajax("./controllers/ajaxGetFavouriteLists.php?file=" + encodeURIComponent(fileName));
                if (req.status == 200) {
                    try {
                        var favouriteItemsList = JSON.parse(req.responseText);
                        $.each(favouriteItemsList.FavouriteLists, function(index, val) {
                            if (val.Name == newFavouriteListName) {
                                $('#invalidFavouriteListSpan').css('display', 'block');
                                validFavouriteListName = false;
                            } else {
                                $('#invalidFavouriteListSpan').css('display', 'none');
                            }
                        });

                        if (validFavouriteListName) {
                            var fileName = currentLoggedUser + "-" + newFavouriteListName + "FavouriteList";
                            var newFavouriteListObj = {
                                "Name": newFavouriteListName,
                                "FileName": currentLoggedUser + "-" + newFavouriteListName + "FavouriteList"
                            }
                            favouriteItemsList.FavouriteLists.push(newFavouriteListObj);
                            var parentFileName = currentLoggedUser + "-favouriteLists";
                            updateFavouriteListWithNew(favouriteItemsList, parentFileName, newFavouriteListObj);
                            updateFavouriteListsWithNewItems(newFavouriteListObj.FileName);
                            newListCreated = true;
                            localStorage.setItem("newListCreated", newListCreated);
                            //$('select option[value="MY_LISTS"]:selected');
                            //$('#favSelect select option[value="MY_LISTS"]:selected');
                            $('#createFavListBtn').remove();
                            var createFavBtn = $('<button>', {
                                'id': 'createFavListBtn',
                                'class': 'ui-btn-fab ui-btn-raised ui-btn ui-btn-inline waves-effect waves-button waves-effect waves-button',
                                'style': 'position: absolute; display: block; right: 3%; width: 40px; top: -100%; border: 0.2px solid rgba(0, 0, 0, 0.8); box-sizing: border-box; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);'
                            }).on('click', function() {
                                $('#createNewFavListPopupDialog').popup('open');
                            });

                            var createFavBtnIcon = $('<i>', {
                                'class': 'zmdi zmdi-plus zmd-2x',
                                'style': 'color: rgba(227, 9, 9, 0.9);'
                            });

                            createFavBtn.append(createFavBtnIcon);

                            $('#fav-footer').append(createFavBtn);
                            moveFavouriteItemsList = [];
                        }

                    } catch (e) {
                        toastr.error('An Error Occurred While Retrieving Favourite Lists');
                    }
                }
            } else {
                $('#invalidFavouriteListSpan').css('display', 'block');
                $('#invalidFavouriteListSpan').text('Enter a name');
            }
            $('#createNewFavListPopupDialog').popup('close');
            $.mobile.changePage('#pgFavourites');
        });


        $('#backBtnFavouritesList').on('click', function() {
            $('#favSelect').empty();
            $('#favouriteItemListDiv').empty();
            $('#favouriteListParentDiv').empty();
            $('#favouriteListSelectorDiv').css('display', 'block');
            $('#favouriteListNameParentDiv').css('display', 'none');
            $('#favouriteItemListDiv').css('display', 'none');
            $('#favouriteListParentDiv').css('display', 'block');
            $('#createFavListBtn').remove();
            var favouriteLists = getFavouriteLists();
            $.each(favouriteLists.FavouriteLists, function(index) {
                var parent = $('#favouriteListParentDiv');
                appendFavouriteListsToParent(parent, this, index);
            });

            var favouriteListOptionAllProducts = $('<option>', {
                'style': 'color: #333 !important; font-size: 9px !important;',
                'value': 'ALL_PRODUCTS'
            });
            favouriteListOptionAllProducts.text("ALL PRODUCTS");

            var favouriteListOptionParent = $('<option>', {
                'style': 'color: #333 !important; font-size: 9px !important;',
                'value': 'MY_LISTS'
            });
            favouriteListOptionParent.text("MY LISTS");

            $('#favSelect').css('width', '100%');

            $('#favSelect').append(favouriteListOptionParent);
            $('#favSelect').append(favouriteListOptionAllProducts);

            var createFavBtn = $('<button>', {
                'id': 'createFavListBtn',
                'class': 'ui-btn-fab ui-btn-raised ui-btn ui-btn-inline waves-effect waves-button waves-effect waves-button',
                'style': 'position: absolute; display: block; right: 3%; width: 40px; top: -100%; border: 0.2px solid rgba(0, 0, 0, 0.8); box-sizing: border-box !important; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25) !important;'
            }).on('click', function() {
                $('#createNewFavListPopupDialog').popup('open');
            });

            var createFavBtnIcon = $('<i>', {
                'class': 'zmdi zmdi-plus zmd-2x',
                'style': 'color: rgba(227, 9, 9, 0.9);'
            });

            createFavBtn.append(createFavBtnIcon);

            $('#fav-footer').append(createFavBtn);
        });



        ///////////////////////// Update With New Favourite List Items  //////////////////////////////////////

        function updateFavouriteListWithNewItems(updatedFavouriteItemList, parentFileName) {
            var fileName = {
                "ParentFileName": parentFileName
            }
            var newObj = $.extend(updatedFavouriteItemList, fileName);
            var recordJSON = JSON.stringify(newObj);
            var req = Ajax("./controllers/ajaxUpdateFavouriteListWithItems.php", "POST", recordJSON);
            if (req.status == 200) {
                return true;

            } else {
                toastr.success('An Error Occurred While Upating Favourite Lists');
                return false;
            }
        };

        /////////////// Append Values to Selector As Options ////////////////////////////////////////////

        function appendToListNames(parent, listName) {

            var favouriteListOptionParent = $('<option>', {
                'style': 'color: #333 !important; margin-right: 10px !important; padding-right: 20px !important; font-size: 9px !important;',
                'value': listName.replace(' ', /_/g)
            });
            favouriteListOptionParent.text(listName);

            parent.append(favouriteListOptionParent);

        }


        function appendFavouriteListsToParent(parent, listObj, index) {

            var favouriteListParent = $('<div>', {
                'style': 'margin-top: 3%;'
            });

            var favouriteListTitleDiv = $('<div>', {
                'style': 'margin-left: 3%; margin-bottom: 1%; display: flex;'
            });

            if (index >= 1) {
                var favouriteListTitleSpan = $('<span>', {
                    'class': 'favouriteListTitleSpan',
                    'style': 'margin-top: 15px;'
                }).on('click', function() {
                    //var currentLoggedUser = localStorage.getItem("currentLoggedInUser");
                    var currentLoggedUser = "User_001";
                    app.GetFavouriteListForUser(currentLoggedUser, favouritesSelectorValue);
                    getFavouriteListsForUser();
                    $('#favouriteItemListDiv').css('display', 'block');
                    $('#favouriteListParentDiv').empty();
                    $('#favouriteListParentDiv').css('display', 'none');
                    $('#createFavListBtn').css('display', 'none');
                    $('#favouriteListSelectorDiv').css('display', 'none');
                    $('#favouriteListNameParentDiv').css('display', 'block');
                    $('#favouriteListTitleSpan').text(listObj.Name.replace(/_/g, ' '));

                });
            } else {
                var favouriteListTitleSpan = $('<span>', {
                    'class': 'favouriteListTitleSpan'
                }).on('click', function() {
                    //var currentLoggedUser = localStorage.getItem("currentLoggedInUser");
                    var currentLoggedUser = "User_001";
                    app.GetFavouriteListForUser(currentLoggedUser, favouritesSelectorValue);
                    getFavouriteListsForUser();
                    $('#favouriteItemListDiv').css('display', 'block');
                    $('#favouriteListParentDiv').empty();
                    $('#favouriteListParentDiv').css('display', 'none');
                    $('#createFavListBtn').css('display', 'none');
                    $('#favouriteListSelectorDiv').css('display', 'none');
                    $('#favouriteListNameParentDiv').css('display', 'block');
                    $('#favouriteListTitleSpan').text(listObj.Name.replace(/_/g, ' '));
                });
            }

            favouriteListTitleSpan.text(listObj.Name.replace(/_/g, ' '));

            var favouriteListContextMenu = $('<img>', {
                'src': './assets/img/menu.png',
                'style': 'height: 18px; width: 18px; transform: rotate(90deg);',
                'id': 'context-menu-' + listObj.Name,
                'class': 'contextMenu iw-mTrigger',
            }).on('click', function() {});

            var menu = [{
                name: 'Delete List',
                fun: function(data, event) {
                    deleteFavouriteItemsList.push(selectedItemId);
                    $('#deletePopupDialog').popup('open');
                }
            }, {
                name: 'Share List via E-mail',
                fun: function(data, event) {
                    shareFavouriteItem = {
                        'productId': selectedItemId,
                        'productName': selectedItemName
                    };
                    $('#sharePopupDialog').popup('open');
                    $('#cancelFavouriteBtn').removeClass('ui-shadow');
                    $('#shareFavouriteBtn').removeClass('ui-shadow');

                }
            }];

            $('.contextMenu').contextMenu(menu);

            if (index >= 1) {
                var itemFavouriteContextMenu = $('<div>', {
                    'style': 'right: 4%; position: absolute; margin-top: 12px;',
                    'class': 'context-menu'
                });

            } else {
                var itemFavouriteContextMenu = $('<div>', {
                    'style': 'right: 4%; position: absolute;',
                    'class': 'context-menu'
                });

            }

            itemFavouriteContextMenu.append(favouriteListContextMenu);

            favouriteListTitleDiv.append(favouriteListTitleSpan);
            favouriteListTitleDiv.append(itemFavouriteContextMenu);

            parent.append(favouriteListTitleDiv);

            var favouriteCarouselParent = $('<div>', {
                'style': 'margin-bottom: 5%;  margin-left: 10px;'
            });

            var favouriteCarouselInner = $('<div>', {
                'id': 'favourite-list-carousel',
                'style': 'margin-left: 5px;'
            });

            var favouriteCarouselInnerItemParent = $('<div>', {
                'id': 'favourite-list-carousel-div-' + listObj.Name,
                'style': 'margin-left: 5px;',
                'class': 'owl-carousel owl-theme owl-loaded owl-drag favourite-list-carousel'
            });

            var favouriteCarouselOuterItemParent = $('<div>', {
                'class': 'owl-stage-outer'
            });

            var favouriteCarouselItemParent = $('<div>', {
                'id': 'owl-item-favourite-parent-div-' + listObj.Name,
                'class': 'owl-stage',
                'style': 'transform: translate3d(-3196px, 0px, 0px); transition: all 0.25s ease 0s; width: 8525px;'
            });

            favouriteCarouselOuterItemParent.append(favouriteCarouselItemParent);
            favouriteCarouselInnerItemParent.append(favouriteCarouselOuterItemParent);
            favouriteCarouselInner.append(favouriteCarouselInnerItemParent);
            favouriteCarouselParent.append(favouriteCarouselInner);

            parent.append(favouriteCarouselParent);

            var favouriteItemsList = getDefaultFavouriteListDetails(listObj.FileName);

            var count = 0;
            $.each(favouriteItemsList.FavouriteItemList, function() {

                if (count >= 2) {
                    $('.favourite-list-carousel').owlCarousel({
                        items: 2.5,
                        loop: true,
                        margin: 10,
                    });
                } else {
                    $('.favourite-list-carousel').owlCarousel({
                        items: 2.5,
                        loop: false,
                        margin: 10,
                    });
                }

                appendFavouriteListItemsToCarousel(favouriteCarouselInnerItemParent, this);
                count++;
            });

            $('#' + favouriteCarouselInnerItemParent.attr('id') + '>div.owl-dots').css('display', 'none');

            var favouriteCarouselDivider = $('<div>', {
                'style': 'height:3px; background: #C4C4C4;'
            });

            parent.append(favouriteCarouselDivider);

        }


        function appendFavouriteListItemsToCarousel(parent, dataObj) {

            var parentDiv = $('<div>', {
                'class': 'owl-item',
                'style': 'width: 145px; margin-left: 10px;',
                'id': dataObj.Product_ID
            });

            var carouselItem = $('<div>', {
                'class': 'item flash-deals-carousel-item-margin'
            });

            var carouselDiv = $('<div>', {
                'style': 'background: #FFFFFF;height: 170px !important;display: flex;border-radius: 20px;border: 0.5px solid rgba(123, 123, 123, 0.8);box-sizing: border-box;'
            });

            var carouselItemParent = $('<div>', {
                'style': 'width: 150px;'
            });

            var favouriteItemImg = $('<img>', {
                'src': dataObj.Path,
                'style': 'width: 80px !important;height: 80px !important; margin-top: 5%;margin-left: 20%;'
            });

            var productDetailsSpan = $('<span>', {
                'style': 'margin-bottom: 5px; text-align: center;',
                'class': 'fav-list-carousel-product-details-text'
            });

            productDetailsSpan.text(dataObj.Product_Name);

            var productPriceSpan = $('<span>', {
                'style': 'margin-left: 35%;',
                'class': 'fav-list-carousel-price-text'
            });

            productPriceSpan.text(dataObj.Price);

            carouselItemParent.append(favouriteItemImg);
            carouselItemParent.append(productDetailsSpan);
            carouselItemParent.append(productPriceSpan);

            carouselDiv.append(carouselItemParent);

            carouselItem.append(carouselDiv);

            parentDiv.append(carouselItem);

            jQuery("#" + parent.attr('id')).trigger('add.owl.carousel', parentDiv).trigger('refresh.owl.carousel');
        }

        ///////////////////////// Update With New Favourites Lists  //////////////////////////////////////

        function updateFavouriteListWithNew(updatedFavouriteList, parentFileName, newFavouriteListObj) {
            var fileName = {
                "ParentFileName": parentFileName
            }
            updatedFavouriteList.FavouriteLists.push(fileName);
            var recordJSON = JSON.stringify(updatedFavouriteList);
            var req = Ajax("./controllers/ajaxUpdateFavouriteList.php", "POST", recordJSON);
            if (req.status == 200) {
                $.mobile.changePage('#pgFavourites');
                $('#createFavouriteListName').val('');

            } else {
                toastr.success('An Error Occurred While Upating Favourite Lists');
            }
        };

        $("#movePopupDialog").bind({
            popupbeforeposition: function(event, ui) {
                getFavouriteListsForUser();
            }
        });

        $("#createNewFavListPopupDialog").bind({
            popupafterclose: function(event, ui) {
                $('#createFavouriteListName').val('');
                $('#invalidFavouriteListSpan').css('display', 'none');
                $.mobile.changePage('#pgFavourites');
            }
        });

        function updateFavouriteListsWithNewItems(fileName) {

            var updatedFavouriteList = getDefaultFavouriteList(moveFavouriteItemsList);
            var fileCreatedSuccess = updateFavouriteListWithNewItems(updatedFavouriteList, fileName);

            if (fileCreatedSuccess) {
                $('#favouriteItemListDiv').empty();
                $('#favouriteItemListDiv').css('display', 'none');
                $('#favouriteListParentDiv').empty();
                $('#favouriteListParentDiv').css('display', 'block');
                var favouriteLists = getFavouriteLists();
                $.each(favouriteLists.FavouriteLists, function(index) {
                    var parent = $('#favouriteListParentDiv');
                    appendFavouriteListsToParent(parent, this, index);
                });
            }

            $('#createNewFavListPopupDialog').popup('close');
            $.mobile.changePage('#pgFavourites');

        }

        /////////// Get Default Favourite List Item Details //////////////////////////

        function getDefaultFavouriteList(moveFavouriteItemsList) {

            var favouriteItemsList = null;
            //var currentLoggedUser = localStorage.getItem('currentLoggedInUser').split('@')[0];
            var currentLoggedUser = "User_001";
            var fileName = currentLoggedUser + "-defaultFavouriteList.json";
            var req = Ajax("./controllers/ajaxGetFavouriteLists.php?file=" + encodeURIComponent(fileName));
            if (req.status == 200) {
                try {
                    favouriteItemsList = JSON.parse(req.responseText);
                    $.each(favouriteItemsList.FavouriteItemList, function(index, value) {
                        if (moveFavouriteItemsList.length >= 1) {
                            $.each(moveFavouriteItemsList, function(i, val) {
                                if (index.split('-')[1] != val) {
                                    delete favouriteItemsList.FavouriteItemList[index];
                                }
                            });
                        } else {
                            favouriteItemsList.FavouriteItemList = {};
                        }
                    });
                } catch (e) {
                    toastr.error('An Error Occurred While Converting Default Favourite Lists To JSON');
                }
            } else {
                toastr.error('An Error Occurred While Retrieving Default Favourite Lists');
            }
            return favouriteItemsList;
        }

        function getFavouriteLists() {
            var favouriteItemsList = null;
            //var currentLoggedUser = localStorage.getItem('currentLoggedInUser').split('@')[0];
            var currentLoggedUser = "User_001";
            var fileName = currentLoggedUser + "-favouriteLists";
            fileName += '.json';
            var req = Ajax("./controllers/ajaxGetFavouriteLists.php?file=" + encodeURIComponent(fileName));
            if (req.status == 200) {
                try {
                    favouriteItemsList = JSON.parse(req.responseText);
                } catch (e) {
                    toastr.error('An Error Occurred While Retrieving Favourite Lists');
                }
            }
            return favouriteItemsList;
        }


        function getDefaultFavouriteListDetails(fileName) {
            var favouriteItemsList = null;
            var req = Ajax("./controllers/ajaxGetFavouriteLists.php?file=" + encodeURIComponent(fileName + ".json"));
            if (req.status == 200) {
                try {
                    favouriteItemsList = JSON.parse(req.responseText);
                } catch (e) {
                    toastr.error('An Error Occurred While Converting Default Favourite Lists To JSON');
                }
            } else {
                toastr.error('An Error Occurred While Retrieving Default Favourite Lists');
            }
            return favouriteItemsList;
        }

        // Function that validates email address through a regular expression.
        function validateEmail(sEmail) {
            var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (filter.test(sEmail)) {
                return true;
            } else {
                return false;
            }
        }


    })(ASDA_Project);
});