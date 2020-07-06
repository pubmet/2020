const yaml = require('yamljs')

describe('programme', () => {
  it('event durations all line up correctly', () => {
    const programme = yaml.load('config/programme.yml')
    let durations = []
    programme.forEach((day) => {
      day.events.forEach((event) => {
        if (event.from && event.to) {
          durations.push({
            day,
            from: event.from,
            to: event.to,
          })
        } else {
          event.events.forEach((event) => {
            durations.push({
              day,
              from: event.from,
              to: event.to,
            })
          })
        }
        durations.forEach((duration, i) => {
          if (i > 0) {
            expect(duration).toMatchObject({ from: durations[i - 1].to })
          }
        })
        durations = []
      })
    })
  })
})
