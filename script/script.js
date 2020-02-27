'use strict';

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnIncomePlus = document.getElementsByTagName('button')[0],
    btnExpensesPlus = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.querySelector('.result-budget_day input'),
    expensesMonthValue = document.querySelector('result-expenses_month input'),
    additionalIncomeValue = document.querySelector('result-additional_income input'),
    additionalExpensesValue = document.querySelector('result-additional_expenses input'),
    incomePeriodValue = document.querySelector('result-income_period input'),
    targetMonthValue = document.querySelector('result-target_month input'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.result-budget_month input'),
    incomeItems = document.querySelectorAll('.income-items');
   
   

class AppData {
    constructor() {

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.addExpenses = [];

    }


    check () {
        if (salaryAmount.value !== ''){
            start.removeAttribute('disabled');
        }
    }


    start () {      
        if (salaryAmount.value === ''){
            start.setAttribute('disabled', 'true');
            return;
        }
            let allInput = document.querySelectorAll('.data input[type = text]');
            allInput.forEach(function(item){
                item.setAttribute('disabled', 'true');
            });
            btnIncomePlus.setAttribute('disabled', 'true');
            btnExpensesPlus.setAttribute('disabled', 'true');
            start.style.display = 'none';
            cancel.style.display = 'block';
    
            this.budget = +salaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonths();
            this.getAddExpenses();
            this.getAddIncome();        
            this.getBudget();
            this.getInfoDeposit();
            this.getStatusIncome();
            this.showResult();         
        }


    showResult (){
            const _this = this;
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            incomePeriodValue.value = this.calcPeriod();
            periodSelect.addEventListener('change', function () {
                incomePeriodValue = _this.calcPeriod();
            });
        }


    addExpensesBlock (){      
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3){
                btnExpensesPlus.style.display = 'none';
            }
        }


    getExpenses (){
            const _this = this;
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== ''){
                    _this.expenses[itemExpenses] = cashExpenses;
                }
            });
        }      

    addIncomeBlock (){
       
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                btnIncomePlus.style.display = 'none';
            }
        }     


    getIncome (){
            const _this = this;
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== ''){
                    _this.expenses[itemIncome] = cashIncome;
                }
            });
            for (let key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        }

    getAddExpenses (){
            let addExpenses = additionalExpensesItem.value.split(',');
            const _this = this;
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== ''){
                    _this.addExpenses.push(item);
                }
            });
        }

    getAddIncome (){
            const _this = this;
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if (itemValue !== ''){
                    _this.addIncome.push(itemValue);
                }
            });
        }

    getExpensesMonths (){
            for (let key in this.expenses){
                this.expensesMonth += +this.expenses[key];
            }
        }


    getBudget (){
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);    
        }
    

    getTargetMonth (){
            return  targetAmount.value / this.budgetMonth;
        }
    

    getStatusIncome (){
            if (this.budgetDay >= 1200){ 
                return ('У вас высокий уровень дохода');
            } else if(this.budgetDay >=600 && this.budgetDay <1200){
                return ('У вас средний уровень дохода');
            } else if(this.budgetDay <600 && this.budgetDay >0){
                return ('К сожалению, у вас низкий уровень дохода');
            }
            else if(this.budgetDay < 0){
                return ('Что-то пошло не так!');
            }
        }


    getInfoDeposit (){
            if(this.deposit){
                do{
                    this.percentDeposit = prompt('Какой годовой процент у депозита?', '10');
                }
                while(!isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
                do{
                    this.moneyDeposit = prompt('Какая сумма положена на депозит?', 10000);
                }
                while(!isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);
            }
        }


    calcPeriod (){
            return this.budgetMonth * periodSelect.value;
        }


    reset (){
            let inputTextData = document.querySelectorAll('.data input[type = text]'),
            resultInputAll = document.querySelectorAll('.result input[type = text]');
    
            inputTextData.forEach(function (elem){
                elem.value = '';
                elem.removeAttribute('disabled');
                periodSelect.value = '0';
                periodAmount.innerHTML = periodSelect.value;
            });
            resultInputAll.forEach( function (elem){
                elem.value = '';
            });
    
            for (let i=1; i < incomeItems.length; i++){
                incomeItems[i].parentNode.removeChild(incomeItems[i]);
                btnIncomePlus.style.display = 'block';
            }
            for (let i=1; i < expensesItems.length; i++){
                expensesItems[i].parentNode.removeChild(incomeItems[i]);
                btnExpensesPlus.style.display = 'block';
            }
    
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = [];
            this.expenses = {};
            this.expensesMonth = 0;
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
            this.addExpenses = [];
            
            cancel.style.display = 'none';
            start.style.display = 'block';
            btnIncomePlus.removeAttribute('disabled');
            btnExpensesPlus.removeAttribute('disabled'); 
            checkBox.checked = false; 
    
        }


    calcSavedMoney (){
            return this.budgetMonth * this.period;
    }

    eventListeners (){
        start.addEventListener('click', this.start.bind(this));
        btnExpensesPlus.addEventListener('click', this.addExpensesBlock);
        btnIncomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('keyup', this.check);
        cancel.addEventListener('click', this.reset.bind(this));
    
        periodSelect.addEventListener('change', () => {
            this.getPeriod();
            incomePeriodValue - this.calcPeriod();
        });
    
        cancel.addEventListener('click', this.reset.bind(this));
    }

}
    
const appData = new AppData();
appData.eventListeners();




let addExp = [];
for (let i=0; i < appData.addExpenses.length; i++){
    let element = appData.addExpenses[i].trim();
    element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    addExp.push(element);
}
