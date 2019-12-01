$(function() {
    // define the application
    var ASDA_Project = {};
    var pgtransition = 'slide';
    var currentLoggedUser = null;
    var favouritesSelectorValue = "ALL_PRODUCTS";
    var deleteFavouriteItemsList = [];
    var shareFavouriteItemsList = [];
    var moveFavouriteItemsList = [];
    var selectedItemId = null;
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
            $.mobile.changePage('#pgShopping');
        });

        $('#homeSearch, #shopSearch, #searchSearch, #favSearch, #accSearch, #flashDealsSearch, #newProductsSearch, #topSelectionSearch').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgSearch');
        });

        $('#homeFavouritesBtn, #shopFavouritesBtn, #searchFavouritesBtn, #favFavouritesBtn, #accFavouritesBtn, #flashDealsFavouritesBtn, #newProductsFavouritesBtn, #topSelectionFavouritesBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.GetFavouriteListForUser(currentLoggedUser, favouritesSelectorValue);
            $.mobile.changePage('#pgFavourites');
        });

        $('#homeAccountBtn, #shopAccountBtn, #searchAccountBtn, #favAccountBtn, #accAccountBtn, #flashDealsAccountBtn, #newProductsAccountBtn, #topSelectionAccountBtn').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
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
                setUserName(userName);
                pgSignInClear();
                currentLoggedUser = Email.split('@')[0];
                // show the page to display after sign in
                toastr.success('Login Success.', 'ASDA_Project');
                $.mobile.changePage('#pgMenu', { transition: pgtransition });
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
            var passwordMatched = checkPasswordMatch($('#pgResetPasswordInput').val().trim(), $('#pgResetConfirmPassword').val().trim());
            if (passwordMatched) {
                app.PasswordReset($('#fourDigitCode').val().trim(), $('#pgResetPasswordInput').val().trim(), $('#pgResetConfirmPassword').val().trim());
            } else {
                toastr.error('Password mismatch. Re-enter the correct password again!');
            }
        });

        app.PasswordReset = function(fourDigitCode, newPassword, newConfirmPassword) {
            var Email = localStorage.getItem("currentLoggedInUser");
            $('#pgResetPassword').data('success', 'true');
            var userName = Email.trim();
            userName = userName.split('@')[0];
            userName += '.json';
            if (fourDigitCode == 0000) {
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

        function pgForgetPasswordClear() {
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
                    }
                    if (userRec.AddressOne != null) {
                        userRec.AddressTwo = newAddress;
                    }
                    if (userRec.AddressTwo != null && userRec.AddressOne != null) {
                        toastr.error('You cannot add more Addresses');
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
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        $('#back-icon-sub-category').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgShopping', { transition: pgtransition });
        });

        $('#user-name, #profile-pic').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgEditAccount', { transition: pgtransition });
        });

        $('#user-name, #profile-pic').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgEditAccount', { transition: pgtransition });
        });

        $('#about-us-icon, #about-us-text').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgAboutUs', { transition: pgtransition });
        });

        $('#back-icon-edit-profile, #back-icon-profile-text, #back-icon-about-us, #back-icon-about-us-text, #back-icon-contact-us, #back-icon-contact-us-text, #back-icon-shipping, #back-icon-shipping-text').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgAccount', { transition: pgtransition });
        });

        $('#location-icon, #location-text').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $.mobile.changePage('#pgShippingAddress', { transition: pgtransition });
        });

        $('#shipping-address-text').on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            app.ShowPopUpDialogBox();
        });

        app.ShowPopUpDialogBox = function() {
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            // When the user clicks anywhere outside of the modal, close it
            $('#close-button').on('click', function(e) {
                modal.style.display = "none";
            });

            $('#pgShippingAddress').on('click', function(e) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            });

            $('#save-address-button').on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                app.UpdateAddress($('#address-input').val().trim());
            });
        }

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
        }

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

        function setUserName(userName) {
            var newUserName = userName.substr(0, userName.indexOf('.'));
            $("#user-name").text(newUserName);
        }


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
                'style': 'width: 148px; margin-right: 10px;'
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


        ///////////// Favourite List Item Append //////////////////////////////////////////////////////////////

        $('#favSelect').change(function() {
            var selectedValue = null;
            var selectedoptions = $(this).find('option:selected');
            if (selectedoptions != undefined) {
                selectedValue = selectedoptions.val();
                favouritesSelectorValue = selectedoptions.val();
                if (selectedValue == "REDUCED_PRICE_PRODUCTS") {
                    $('#edit-btn').css('margin-left', '29%');
                } else {
                    $('#edit-btn').css('margin-left', '50.8%');
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
                    $('#pgFavouritesContent').empty();
                    topAlignPercentage = 23;
                    $.each(favouriteItemsList.FavouriteItemList, function() {
                        appendFavouriteItemsToList($('#pgFavouritesContent'), this, topAlignPercentage);
                        topAlignPercentage += 18;
                    });
                } catch (e) {
                    toastr.success('An Error Occurred While Retrieving Favourite Item List');
                }
            }

        };

        //////////////////////// Append Favourite List Items To List //////////////////////////////

        function appendFavouriteItemsToList(parent, dataObj, topAlignPercentage) {

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
                'id': 'context-menu-' + dataObj.Product_ID
            }).on('click', function() {
                selectedItemId = this.id.split('-')[2];
            });

            var menu = [{
                name: 'Move to',
                fun: function(data, event) {
                    alert('i am Move To button');
                }
            }, {
                name: 'Delete',
                fun: function(data, event) {
                    $('#deletePopupDialog').popup('open');
                }
            }, {
                name: 'Share via E-mail',
                fun: function(data, event) {
                    $('#sharePopupDialog').popup('open');
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
                $('#pgFavouritesContent').find("div#" + element).remove();

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



        });

        ////////////////////////// Upadate Favourite Items List //////////////////////////////////////////////////////

        function updateFavouriteList(updatedFavouriteList, fileName) {
            updatedFavouriteList.FavouriteItemList.FileName = fileName;
            var recordJSON = JSON.stringify(updatedFavouriteList);
            var req = Ajax("./controllers/ajaxSaveFavouriteList.php", "POST", recordJSON);
            if (req.status == 200) {} else {
                toastr.success('An Error Occurred While Deleting Item');
            }
        };


        //////////// Share Favourite From List //////////////////////////////////////

        function shareFavouriteItems(shareFavouriteItemsList) {
            shareFavouriteItemsList.forEach(element => {
                $('#pgFavouritesContent').find("div#" + element.Product_ID).remove();
                shareFavouriteItemsList = [];
            });
        }

        //////////// Move Favourite From List //////////////////////////////////////

        function moveFavouriteItems(moveFavouriteItemsList) {
            moveFavouriteItemsList.forEach(element => {
                $('#pgFavouritesContent').find("div#" + element.Product_ID).remove();
                deleteFavouriteItemsList = [];
            });
        }

        $('#shareSubmitBtn').on('click', function() {
            var sEmail = $('#shareFavouriteViaEmail').val();
            // Checking Empty Fields
            if ($.trim(sEmail).length == 0) {
                $('#invalidEmailSpan').css('display', 'block');
            }
            if (validateEmail(sEmail)) {
                $('#invalidEmailSpan').css('display', 'none');

            } else {
                $('#invalidEmailSpan').css('display', 'block');
            }
        });

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