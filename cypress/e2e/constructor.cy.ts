describe('Тестирование приложений cypress', () => {
    const url = 'http://localhost:4000';

    it('Проверка доступа localhost:4000', () => {
        cy.visit(url);
        cy.viewport(1280, 720);
    });

    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', (req) => {
            //     console.log('Request intercepted for api/ingredients:', req);
            req.reply({
                fixture: 'ingredients.json'
            });
        }).as('getIngredients');

        cy.intercept('GET', 'api/auth/user', {
            fixture: 'userTest.json'
        }).as('getUser');

        cy.visit(url);
        cy.setCookie('accessToken', 'mockAccessToken');
        localStorage.setItem('refreshToken', 'mockRefreshToken');
    });

    afterEach(() => {
        cy.setCookie('accessToken', '');
        localStorage.setItem('refreshToken', '');
    });

    describe('Тестирование модальных окон', () => {
        beforeEach(() => {
            cy.get('[data-cy="ingredients-category"]').find('li').first().click();
            cy.get('[data-cy="modal"]').should('be.visible');
        });
        it('Проверка закрытия модального окна', () => {
            cy.get('[data-cy="close-button"]').click();
            cy.get('[data-cy="modal"]').should('not.exist');
        });
        it('Проверка открытия с описанием модального окна', () => {
            cy.get('[data-cy="modal"]').should('exist');
            cy.get('[data-cy="ingredient-image"]').should('be.visible');
            cy.get('[data-cy="ingredient-name"]').should('not.be.empty')
            cy.get('li').children('p').contains('Калории, ккал').next('p').should('not.be.empty');
            cy.get('li').children('p').contains('Белки, г').next('p').should('not.be.empty');
            cy.get('li').children('p').contains('Жиры, г').next('p').should('not.be.empty');
            cy.get('li').children('p').contains('Углеводы, г').next('p').should('not.be.empty');
        });
    });

    describe('Добавление ингрединетов в заказ', () => {

        it('Проверка добавление булки в заказ', () => {
            cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
            cy.get('div').contains('Выберите булки').should('not.exist');
        });
        it('Проверка добавление ингредиентов в заказ', () => {
            cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click() ||
            cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
            cy.get('div').contains('Выберите начинку').should('not.exist');
        });
    });
  
    describe('Оформление заказа', () => {
        beforeEach(() => {
            cy.intercept('POST', 'api/orders', {
                fixture: 'orderTest.json'
            }).as('postOrders');
        });

        it('Проверка формирование заказа', () => {
            cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
            cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click() ||
            cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
            cy.contains('Оформить заказ').click();
            cy.contains('38854').should('be.visible');
            cy.get('[data-cy="close-button"]').click();
            cy.get('[data-cy="modal"]').should('not.exist');
            cy.contains('Выберите булки').should('exist');
            cy.contains('Выберите начинку').should('exist');
        });
    });
});