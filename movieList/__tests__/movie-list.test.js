const {Builder, Capabilities, By} = require('selenium-webdriver');
require(`chromedriver`);

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5501/movieList/index.html');
    await driver.sleep(2000)
})

afterAll(async () => {
    await driver.close()
    await driver.sleep(2000)
})

const addMovie = async (driver) => {
    await driver.findElement(By.xpath('//input')).sendKeys('Malignant');
    // await driver.sleep(1000)
    
    await driver.findElement(By.xpath('//button')).click();
    // await driver.sleep(1000)
    
    const movie = await driver.findElement(By.xpath('//li'));
    // await driver.sleep(1000)
    
    const displayed = movie.isDisplayed();
    // await driver.sleep(1000)
    
    expect(displayed).toBeTruthy();
}

const crossOut = async (driver) => {
    await driver.findElement(By.xpath('//ul/li/span')).click();
    // await driver.sleep(1000)

    const crossed = await driver.findElement(By.css('[class="checked"]'));
    // await driver.sleep(1000)

    const displayed = crossed.isDisplayed()
    // await driver.sleep(1000)

    expect(displayed).toBeTruthy();
    // await driver.sleep(1000)

}


const messageAlert = async (driver) => {
    
    // await driver.findElement(By.xpath('//span')).click();

    await driver.sleep(1000)

    const message = await driver.findElement(By.xpath('//*[@id="message"]'));
    
    const hidden = await driver.findElement(By.xpath('//*[@class="hide"]'))

    expect(message).not.toContain(hidden)

}

const deleteMovie = async (driver) => {
    await driver.findElement(By.xpath('//ul/li/button')).click()

    const deleted = await driver.findElement(By.xpath('//ul')).getText()
  
    expect(deleted).toBe('')

}



describe('Movie site is functional', ()=> {
    
    
    test('Movie can be added', async () => {
        await addMovie(driver)
        await driver.sleep(3000)
    })
    
    
    it('checks the cross-out feature', async () => {
        await crossOut(driver)
        await driver.sleep(3000)
    })
            
    it('checks "watched" alert is working', async () => {
        await messageAlert(driver)
        await driver.sleep(3000)
    })
                
    it('checks delete functionality', async () => {
        await deleteMovie(driver)
        await driver.sleep(3000)
    })
})