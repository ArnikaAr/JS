const main = require('./main');
const matchers = require('@testing-library/jest-dom/extend-expect');
const $ = require('./jquery-2.1.4.min')
let form = null;

beforeEach(() => {
    document.body.innerHTML = `
    <form>
    <div class="form-holderArea">
        <h1>Send request:
        </h1>
        <div class="formMain">
            <p><label for="name">Name: <br><small>(min 3 characters length)</small></label>
                <input type="text" id="name" class="input_name" name="name"></p>

            <p><label for="second_name">Second name: <br>
                <small>(min 3 characters length)</small></label>
                <input type="text" id="second_name" name="second_name" class="second_nameClass">
            </p>
            <p><label for="details_block">Add details:</label>
                <input type="checkbox" id="details_block" name="details_block" class="input_name">
                <div class="details" id="details"><textarea  id="txtArea"></textarea></div>
                <button class="SubmitButton" type="submit">
                    Send
                </button>
            </p>
        </div>
    </div>
</form>
<div class="success-PopUpOverlay" id="success-PopUpOverlay"></div>
    <div class="successHolder">
        <span></span>
        <p>thanks for your request!</p>
        <button class="closeButton">Close</button>
    </div>`;

    form = require("./main");
});

describe('test for test', () => {
    test("Checking state after open_details", () => {
        form.open_details();
        const details = $('.details');
        expect(details[0]).toHaveStyle('display:block');
    });
    test("Checking state after initializeClose_button", () => {
        const beverage = {name: 'none'};
        const initializeClose_button = jest.fn(beverage => beverage.name);
        initializeClose_button(beverage);
        expect(initializeClose_button).toHaveReturnedWith('none');
    });
    test("Checking state after hide_Details", () => {
        const beverage = {name: 'none'};
        const hide_Details = jest.fn(beverage => beverage.name);
        hide_Details(beverage);
        expect(hide_Details).toHaveReturnedWith('none');
    });
    test("Checking state is_checkbox_clicked", () => {
        const beverage = {name: 'block'};
        const is_checkbox_clicked = jest.fn(beverage => beverage.name);
        is_checkbox_clicked(beverage);
        expect(is_checkbox_clicked).toHaveReturnedWith('block');
    });
    test("Checking state init", () => {
        const beverage = {name: 'none'};
        const init = jest.fn(beverage => beverage.name);
        init(beverage);
        expect(init).toHaveReturnedWith('none');
    });
});