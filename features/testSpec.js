describe('Conciliação', function() {
  describe('Autenticação', function () {
    it('deve logar-se e ser redirecionado para o dashboard', function () {
      browser.url('https://aws-conciliacao.cappta.com.br');

      var login = browser.element('#Login');
      login.setValue('drconsulta-master');

      var password = browser.element('#Password')
      password.setValue('123456');

      browser.click('#do-login');

      browser.waitForExist('.LogoCappta', 5000);
      expect(browser.getTitle()).toEqual('Cappta Conciliação');
    });

    it('Verificar valor do box "Hoje"',function(){
    	browser.pause(3000);
    	var valueToday = browser.element('.ValueToday span', 0);
    	
        expect(valueToday.getText()).toEqual('0.00');
    });
    it('Verificar se valor divergente do dashboard é igual o do relatório taxas-divergentes', function(){
    	var divergentTaxDashboard = browser.element('.ValueConcilNumber p', 2);
    	browser.click('.BoxAjustItemCancellations:nth-child(2)');
		var divergentTab = browser.getTabIds()[1];
		console.log(divergentTab);    	
		
		browser.switchTab(divergentTab);
    	browser.pause(5000);

    	var footerTable = browser.element('#table0_info');
    	console.log(footerTable.getText());
        var valueTotalFooterTable = footerTable.getText().substr(footerTable.getText().length - 12, 3);
        expect(valueTotalFooterTable).toEqual('111');
    });
  });
});