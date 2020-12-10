// // var Inputmask = require('inputmask');
$(document).ready(function(){
    // $(":input").inputmask();
    // Inputmask().mask(document.querySelectorAll("input"));
    // alert("hi");
    checkDependente();
    checkQuantosFormularios();
});

function checkDependente() {
    var x = document.getElementById("plan").value;
    if(x === "171") {
        document.getElementById("dependant_div").style.display = 'inline';
    } else {
        document.getElementById("dependant_div").style.display = 'none';
    }
}

function checkQuantosFormularios() {
    var key = document.getElementById("numero_dependentes").value;
    switch (key) {
        case '3':
            document.getElementById("dependant_1_div").style.display = 'inline';
            document.getElementById("dependant_2_div").style.display = 'inline';
            document.getElementById("dependant_3_div").style.display = 'inline';
            break;
        case '2':
            document.getElementById("dependant_1_div").style.display = 'inline';
            document.getElementById("dependant_2_div").style.display = 'inline';
            document.getElementById("dependant_3_div").style.display = 'none';
            break;
        case '1':
            document.getElementById("dependant_1_div").style.display = 'inline';
            document.getElementById("dependant_2_div").style.display = 'none';
            document.getElementById("dependant_3_div").style.display = 'none';
            break
        default:
            document.getElementById("dependant_1_div").style.display = 'none';
            document.getElementById("dependant_2_div").style.display = 'none';
            document.getElementById("dependant_3_div").style.display = 'none';
            break;
    }
}

function checkCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function sendData() {
    var resultadoApiCalls = "";
    var numeroApiCalls = 4;
    var cadastrarButton = document.getElementById("cadastrar_button");
    cadastrarButton.innerHTML = "Aguarde..."
    var cpfTitularParaVerificacaoCPF = "";

    var CorporateId = "39";
    var StatusBeneficiario = "A";
    var IdentificacaoCliente = "205";
    var CodigoContrato = "171";

    var apiObject = {};
    apiObject["CorporateId"] = CorporateId;
    apiObject["StatusBeneficiario"] = StatusBeneficiario;
    apiObject["IdentificacaoCliente"] = IdentificacaoCliente;
    apiObject["CodigoContrato"] = CodigoContrato;
    
    // ---------------------------------------------------------Dados titular
    var Nome = document.forms["my-form"]["nome_titular"].value;
    var DataNascimento = document.forms["my-form"]["birthday_titular"].value;
    var Email = document.forms["my-form"]["email_titular"].value;
    var TelefoneCelular = document.forms["my-form"]["phone_titular"].value;
    var Sexo = document.forms["my-form"]["sex_titular"].value;
    var IdentificacaoPessoa = document.forms["my-form"]["cpfcnpj"].value;
    // var Produtos = document.forms["my-form"]["product"].value;
    var Produtos = "18";
    
    var cpfCorreto = checkCPF(IdentificacaoPessoa);
    cpfTitularParaVerificacaoCPF = IdentificacaoPessoa;
    if (!cpfCorreto) {
        alert("CPF titular inválido");
        cadastrarButton.innerHTML = "Cadastrar"
        return false;
    }
    
    // if (IdentificacaoBeneficiario) apiObject["IdentificacaoBeneficiario"] = IdentificacaoBeneficiario;
    // if (DataNascimento) apiObject["DataNascimento"] = '05-05-1993';
    if (Produtos) apiObject["Produtos"] = Produtos;
    if (Nome) apiObject["Nome"] = Nome.toLowerCase();
    if (DataNascimento) apiObject["DataNascimento"] = DataNascimento;
    if (Email) apiObject["Email"] = Email;
    if (TelefoneCelular) apiObject["TelefoneCelular"] = TelefoneCelular;
    if (Sexo) apiObject["Sexo"] = Sexo;
    if (IdentificacaoPessoa) apiObject["IdentificacaoPessoa"] = IdentificacaoPessoa;
    if (IdentificacaoPessoa) apiObject["CPFCNPJ"] = IdentificacaoPessoa;
    apiObject["BeneficiarioTitular"] = "";
    apiObject["TipoPessoa"] = "1"; //Tipo titular!
    
    var jsonString = JSON.stringify(apiObject, undefined, 2);

    // TESTES
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapihomologacao/lmapi/cadastro', true);
    // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    // xhr.setRequestHeader('Authorization', 'Bearer ' + 'LEKuQBkDmKbtnBsCbQq70wRClD1MMLAmn3GRs5NLWA-FgUecs0ScGf3ebrMtmj28nRNAVI5JneiR4zNPwqZJqRPpXwA1cFyDFMbAR4dhU0vj5A3Obr2cqWGeEkMBmAmFThgJhDKlo1TVNlys7aH8l76kSMWML2p5u48Td2gAqXdXW5epZ30q4IruHooH5QELxfXp61lSxs2TtT4-29k9fxJjHtHgKHEPuu8CT6rH4-q5AdauqZpt3PeomTUvMGPNzLWMFM1T7-GyOE_qXtj3oqWwfjFwSo6iTP6l_IJNhfwt2o6V3CBqpzdaCPYlsYnm');
    // xhr.send(jsonString);


    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapi/lmapi/cadastro', true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.setRequestHeader('Authorization', 'Bearer ' + 'Xs-mxh7mDOTrVxcDdxayQQNLCDtsxlb4ppH14eLFEOZLSnmkHJdoClyCXRRQQ6NZ9hv2yARGFjaAkHQM8gxcJBbPPe1KxzLDHgbHVL3ZDwe5brAdRTZFIJ8XHplSiOXHWZpZUEp-CsgBTymP2v5DMoPl6Z8YxVduXKvUazrvREFNmQUjfY8aO8I3ay0Pt_KsObIUg8DckNGUvQwDn1hl8sei5kFAL7nFCuNGfM7-wLKwqnuPMLjA2F_nlGeDEg_vQAANl6P0toZz14mBHEjFIFjZWs4NL4zdiEXuipa3Cs910xT-GE4oJPaxHfNGEqFL');
    xhr.send(jsonString);

    let terminouXHRTitular = false;
    // Create a root reference
    var ref = firebase.storage();
    var storageRef = ref.ref();

    // resultadoApiCalls
    xhr.onload = function() {
        if (xhr.status != 200) { // analyze HTTP status of the response
            resultadoApiCalls = resultadoApiCalls + "Titular: Erro ao cadastrar Titular \n";
            numeroApiCalls = numeroApiCalls -1;
            terminouXHRTitular = true;
        } else { // show the result
            resultadoApiCalls = resultadoApiCalls + "Titular: Cadastrado \n";
            numeroApiCalls = numeroApiCalls -1;
            terminouXHRTitular = true;

            storageRef.child('TopFamilyAtivos/' + Nome + '_' + DataNascimento + "_TITULAR").putString(jsonString, firebase.storage.StringFormat.RAW).then(function(snapshot) {
                console.log('Uploaded string');
            }).catch(function(error) {
                console.log(error);
            });

            if(CodigoContrato == 171) {
                storageRef.child('TopFamilyAtivosFamilia/' + Nome + '_' + DataNascimento + "_TITULAR" + BeneficiarioTitular).putString(jsonString4, firebase.storage.StringFormat.RAW).then(function(snapshot) {
                    console.log('Uploaded string');
                }).catch(function(error) {
                    console.log(error);
                });
            } else {
                storageRef.child('TopFamilyAtivosIndividual/' + Nome + '_' + DataNascimento + "_TITULAR" + BeneficiarioTitular).putString(jsonString4, firebase.storage.StringFormat.RAW).then(function(snapshot) {
                    console.log('Uploaded string');
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
    };
    
    xhr.onerror = function() {
        alert("Request failed");
        terminouXHRTitular = true
    };

    let tempoRolando = setInterval(function(){ 
        if (terminouXHRTitular) {
            clearInterval(tempoRolando)
        }
    }, 1000);
    
    // ----------------------Dados dependente 1---------------------------------------------
    var key = document.getElementById("numero_dependentes").value;
    if (key == "1" || key == "2" || key == 3) {
        var apiObject2 = {};
        apiObject2["CorporateId"] = CorporateId;
        apiObject2["StatusBeneficiario"] = StatusBeneficiario;
        apiObject2["IdentificacaoCliente"] = IdentificacaoCliente;
        apiObject2["Produtos"] = Produtos;
        apiObject2["CodigoContrato"] = CodigoContrato;

        Nome = document.forms["my-form"]["nome_dependente"].value;
        DataNascimento = document.forms["my-form"]["birthday_dependente"].value;
        Email = document.forms["my-form"]["email_dependente"].value;
        TelefoneCelular = document.forms["my-form"]["phone_dependente"].value;
        Sexo = document.forms["my-form"]["sex_dependente"].value;
        IdentificacaoPessoa = document.forms["my-form"]["cpf_dependente"].value;
        var BeneficiarioTitular = document.forms["my-form"]["cpfcnpj"].value;
        
        cpfCorreto = checkCPF(IdentificacaoPessoa);
        if (!cpfCorreto && IdentificacaoPessoa != (cpfTitularParaVerificacaoCPF + "1")) {
            alert("CPF dependente 1 inválido");
            cadastrarButton.innerHTML = "Cadastrar"
            return false;
        }
        
        // if (IdentificacaoBeneficiario) apiObject2["IdentificacaoBeneficiario"] = IdentificacaoBeneficiario;
        // if (DataNascimento) apiObject2["DataNascimento"] = '05-05-1993';
        if (Nome) apiObject2["Nome"] = Nome.toLowerCase();
        if (DataNascimento) apiObject2["DataNascimento"] = DataNascimento;
        if (Email) apiObject2["Email"] = Email;
        if (TelefoneCelular) apiObject2["TelefoneCelular"] = TelefoneCelular;
        if (Sexo) apiObject2["Sexo"] = Sexo;
        if (IdentificacaoPessoa) apiObject2["IdentificacaoPessoa"] = IdentificacaoPessoa;
        if (IdentificacaoPessoa) apiObject2["CPFCNPJ"] = IdentificacaoPessoa;
        apiObject2["BeneficiarioTitular"] = BeneficiarioTitular;
        apiObject2["TipoPessoa"] = "2"; //Tipo dependente!

        var jsonString2 = JSON.stringify(apiObject2, undefined, 2);

        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapi/lmapi/cadastro', true);
        xhr2.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr2.setRequestHeader('Authorization', 'Bearer ' + 'Xs-mxh7mDOTrVxcDdxayQQNLCDtsxlb4ppH14eLFEOZLSnmkHJdoClyCXRRQQ6NZ9hv2yARGFjaAkHQM8gxcJBbPPe1KxzLDHgbHVL3ZDwe5brAdRTZFIJ8XHplSiOXHWZpZUEp-CsgBTymP2v5DMoPl6Z8YxVduXKvUazrvREFNmQUjfY8aO8I3ay0Pt_KsObIUg8DckNGUvQwDn1hl8sei5kFAL7nFCuNGfM7-wLKwqnuPMLjA2F_nlGeDEg_vQAANl6P0toZz14mBHEjFIFjZWs4NL4zdiEXuipa3Cs910xT-GE4oJPaxHfNGEqFL');
        xhr2.send(jsonString2);
        
        xhr2.onload = function() {
            if (xhr2.status != 200) { // analyze HTTP status of the response
                resultadoApiCalls = resultadoApiCalls + "Dependente 1: Erro ao cadastrar dependente 1 \n";
                numeroApiCalls = numeroApiCalls -1;
            } else { // show the result
                resultadoApiCalls = resultadoApiCalls + "Dependente 1: Cadastrado \n";
                numeroApiCalls = numeroApiCalls -1;

                storageRef.child('TopFamilyAtivos/' + Nome + '_' + DataNascimento + "_DEPENDENTE_DO_" + BeneficiarioTitular).putString(jsonString2, firebase.storage.StringFormat.RAW).then(function(snapshot) {
                    console.log('Uploaded string');
                }).catch(function(error) {
                    console.log(error);
                });
            }
        };
        
        xhr2.onerror = function() {
            alert("Request failed");
        };

    }

    // ----------------------Dados dependente 2--------------------------------------------
    if (key == "2" || key == 3) {
        var apiObject3 = {};
        apiObject3["CorporateId"] = CorporateId;
        apiObject3["StatusBeneficiario"] = StatusBeneficiario;
        apiObject3["IdentificacaoCliente"] = IdentificacaoCliente;
        apiObject3["Produtos"] = Produtos;
        apiObject3["CodigoContrato"] = CodigoContrato;

        Nome = document.forms["my-form"]["nome_dependente_2"].value;
        DataNascimento = document.forms["my-form"]["birthday_dependente_2"].value;
        Email = document.forms["my-form"]["email_dependente_2"].value;
        TelefoneCelular = document.forms["my-form"]["phone_dependente_2"].value;
        Sexo = document.forms["my-form"]["sex_dependente_2"].value;
        IdentificacaoPessoa = document.forms["my-form"]["cpf_dependente_2"].value;
        BeneficiarioTitular = document.forms["my-form"]["cpfcnpj"].value;
        
        cpfCorreto = checkCPF(IdentificacaoPessoa);
        if (!cpfCorreto && IdentificacaoPessoa != (cpfTitularParaVerificacaoCPF + "2")) {
            alert("CPF dependente 2 inválido");
            cadastrarButton.innerHTML = "Cadastrar"
            return false;
        }
        
        // if (IdentificacaoBeneficiario) apiObject3["IdentificacaoBeneficiario"] = IdentificacaoBeneficiario;
        // if (DataNascimento) apiObject3["DataNascimento"] = '05-05-1993';
        if (Nome) apiObject3["Nome"] = Nome.toLowerCase();
        if (DataNascimento) apiObject3["DataNascimento"] = DataNascimento;
        if (Email) apiObject3["Email"] = Email;
        if (TelefoneCelular) apiObject3["TelefoneCelular"] = TelefoneCelular;
        if (Sexo) apiObject3["Sexo"] = Sexo;
        if (IdentificacaoPessoa) apiObject3["IdentificacaoPessoa"] = IdentificacaoPessoa;
        if (IdentificacaoPessoa) apiObject3["CPFCNPJ"] = IdentificacaoPessoa;
        apiObject3["BeneficiarioTitular"] = BeneficiarioTitular;
        apiObject3["TipoPessoa"] = "2"; //Tipo dependente!

        var jsonString3 = JSON.stringify(apiObject3, undefined, 2);

        var xhr3 = new XMLHttpRequest();
        xhr3.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapi/lmapi/cadastro', true);
        xhr3.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr3.setRequestHeader('Authorization', 'Bearer ' + 'Xs-mxh7mDOTrVxcDdxayQQNLCDtsxlb4ppH14eLFEOZLSnmkHJdoClyCXRRQQ6NZ9hv2yARGFjaAkHQM8gxcJBbPPe1KxzLDHgbHVL3ZDwe5brAdRTZFIJ8XHplSiOXHWZpZUEp-CsgBTymP2v5DMoPl6Z8YxVduXKvUazrvREFNmQUjfY8aO8I3ay0Pt_KsObIUg8DckNGUvQwDn1hl8sei5kFAL7nFCuNGfM7-wLKwqnuPMLjA2F_nlGeDEg_vQAANl6P0toZz14mBHEjFIFjZWs4NL4zdiEXuipa3Cs910xT-GE4oJPaxHfNGEqFL');
        xhr3.send(jsonString3);
        
        xhr3.onload = function() {
            if (xhr3.status != 200) { // analyze HTTP status of the response
                resultadoApiCalls = resultadoApiCalls + "Dependente 2: Erro ao cadastrar dependente 2 \n"
                numeroApiCalls = numeroApiCalls -1;
            } else { // show the result
                resultadoApiCalls = resultadoApiCalls + "Dependente 2: Cadastrado \n"
                numeroApiCalls = numeroApiCalls -1;

                storageRef.child('TopFamilyAtivos/' + Nome + '_' + DataNascimento + "_DEPENDENTE_DO_" + BeneficiarioTitular).putString(jsonString3, firebase.storage.StringFormat.RAW).then(function(snapshot) {
                    console.log('Uploaded string');
                }).catch(function(error) {
                    console.log(error);
                });
            }
        };

    }

    // ----------------------Dados dependente 3--------------------------------------------
    if (key == 3) {
        var apiObject4 = {};
        apiObject4["CorporateId"] = CorporateId;
        apiObject4["StatusBeneficiario"] = StatusBeneficiario;
        apiObject4["IdentificacaoCliente"] = IdentificacaoCliente;
        apiObject4["Produtos"] = Produtos;
        apiObject4["CodigoContrato"] = CodigoContrato;

        Nome = document.forms["my-form"]["nome_dependente_3"].value;
        DataNascimento = document.forms["my-form"]["birthday_dependente_3"].value;
        Email = document.forms["my-form"]["email_dependente_3"].value;
        TelefoneCelular = document.forms["my-form"]["phone_dependente_3"].value;
        Sexo = document.forms["my-form"]["sex_dependente_3"].value;
        IdentificacaoPessoa = document.forms["my-form"]["cpf_dependente_3"].value;
        BeneficiarioTitular = document.forms["my-form"]["cpfcnpj"].value;
        
        cpfCorreto = checkCPF(IdentificacaoPessoa);
        if (!cpfCorreto && IdentificacaoPessoa != (cpfTitularParaVerificacaoCPF + "3")) {
            alert("CPF dependente 2 inválido");
            cadastrarButton.innerHTML = "Cadastrar"
            return false;
        }
        
        // if (IdentificacaoBeneficiario) apiObject4["IdentificacaoBeneficiario"] = IdentificacaoBeneficiario;
        // if (DataNascimento) apiObject4["DataNascimento"] = '05-05-1993';
        if (Nome) apiObject4["Nome"] = Nome.toLowerCase();
        if (DataNascimento) apiObject4["DataNascimento"] = DataNascimento;
        if (Email) apiObject4["Email"] = Email;
        if (TelefoneCelular) apiObject4["TelefoneCelular"] = TelefoneCelular;
        if (Sexo) apiObject4["Sexo"] = Sexo;
        if (IdentificacaoPessoa) apiObject4["IdentificacaoPessoa"] = IdentificacaoPessoa;
        if (IdentificacaoPessoa) apiObject4["CPFCNPJ"] = IdentificacaoPessoa;
        apiObject4["BeneficiarioTitular"] = BeneficiarioTitular;
        apiObject4["TipoPessoa"] = "2"; //Tipo dependente!

        var jsonString4 = JSON.stringify(apiObject4, undefined, 2);

        var xhr4 = new XMLHttpRequest();
        xhr4.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapi/lmapi/cadastro', true);
        xhr4.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr4.setRequestHeader('Authorization', 'Bearer ' + 'Xs-mxh7mDOTrVxcDdxayQQNLCDtsxlb4ppH14eLFEOZLSnmkHJdoClyCXRRQQ6NZ9hv2yARGFjaAkHQM8gxcJBbPPe1KxzLDHgbHVL3ZDwe5brAdRTZFIJ8XHplSiOXHWZpZUEp-CsgBTymP2v5DMoPl6Z8YxVduXKvUazrvREFNmQUjfY8aO8I3ay0Pt_KsObIUg8DckNGUvQwDn1hl8sei5kFAL7nFCuNGfM7-wLKwqnuPMLjA2F_nlGeDEg_vQAANl6P0toZz14mBHEjFIFjZWs4NL4zdiEXuipa3Cs910xT-GE4oJPaxHfNGEqFL');
        xhr4.send(jsonString4);
        
        xhr4.onload = function() {
            if (xhr4.status != 200) { // analyze HTTP status of the response
                resultadoApiCalls = resultadoApiCalls + "Dependente 3: Erro ao cadastrar dependente 3 \n";
                numeroApiCalls = numeroApiCalls -1;
            } else { // show the result
                resultadoApiCalls = resultadoApiCalls + "Dependente 3: Cadastrado \n"
                numeroApiCalls = numeroApiCalls -1;

                storageRef.child('TopFamilyAtivos/' + Nome + '_' + DataNascimento + "_DEPENDENTE_DO_" + BeneficiarioTitular).putString(jsonString4, firebase.storage.StringFormat.RAW).then(function(snapshot) {
                    console.log('Uploaded string');
                }).catch(function(error) {
                    console.log(error);
                });
            }
        };

    }

    if (key == 2) {
        numeroApiCalls = numeroApiCalls -1;
    }

    if (key == 1) {
        numeroApiCalls = numeroApiCalls -2;
    }

    if (key == 0) {
        numeroApiCalls = numeroApiCalls -3;
    }

    var interval = setInterval(function() { 
        if(numeroApiCalls == 0) {
            clearInterval(interval);
            cadastrarButton.innerHTML = "Cadastrar"
            alert(resultadoApiCalls);
        } 
    }, 500);

    // var params = {
    //     username: 'ads',
    //     password: 'dasd',
    //     grant_type: 'asdsda'
    // };

    // var formData = new FormData();
    // formData.append('username', 'dasdas');
    // formData.append('password', 'ads');
    // formData.append('grant_type', 'asdads');

    // let test = {
    //     'username': 'fafa'
    //     'password': 'fasdasd'
    //     'grant_type': 'asfaewqe'
    // }

    // $.ajax({
    //     url: 'http://lifemanager.nextplus.com.br:9095/lifemanagerapihomologacao/lmapi/token',
    //     data: formData,
    //     type: 'POST',
    //     // contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    //     processData: false, // NEEDED, DON'T OMIT THIS
    //     success: function(response) {
    //         console.log(response);
    //     },
    //     complete: function(response) {
    //         console.log(response);
    //     },
    //     error: function(response) {
    //         console.log(response);
    //     }
    // });
    

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://lifemanager.nextplus.com.br:9095/lifemanagerapihomologacao/lmapi/token', true);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhr.send(test);

    // const url = "https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapihomologacao/lmapi/token";
    // fetch(url, {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     },
    //     method : "POST",
    //     body: formData,
    // }).then(
    //     // response => response.text() // .json(), etc.
    //     () => console.log(response)
    //     // same as function(response) {return response.text();}
    // ).then(
    //     html => console.log(html)
    // );

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://cors-anywhere.herokuapp.com/http://lifemanager.nextplus.com.br:9095/lifemanagerapihomologacao/lmapi/cadastro', true);
    // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    // xhr.setRequestHeader('Authorization', 'Bearer ' + 'Xs-mxh7mDOTrVxcDdxayQQNLCDtsxlb4ppH14eLFEOZLSnmkHJdoClyCXRRQQ6NZ9hv2yARGFjaAkHQM8gxcJBbPPe1KxzLDHgbHVL3ZDwe5brAdRTZFIJ8XHplSiOXHWZpZUEp-CsgBTymP2v5DMoPl6Z8YxVduXKvUazrvREFNmQUjfY8aO8I3ay0Pt_KsObIUg8DckNGUvQwDn1hl8sei5kFAL7nFCuNGfM7-wLKwqnuPMLjA2F_nlGeDEg_vQAANl6P0toZz14mBHEjFIFjZWs4NL4zdiEXuipa3Cs910xT-GE4oJPaxHfNGEqFL');
    // xhr.send(jsonString);
    // alert("Cadastro realizado");

    // // Create a root reference
    // var ref = firebase.storage();
    // var storageRef = ref.ref();


    // storageRef.child('TopFamilyAtivos/' + Nome + '_' + DataNascimento + marcaDependente).putString(jsonString, firebase.storage.StringFormat.RAW).then(function(snapshot) {
    //     console.log('Uploaded string');
    // }).catch(function(error) {
    //     console.log(error);
    // });

    // document.getElementById("my-form").reset();

    return false;
}
