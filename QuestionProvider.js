import dataGetter from './Data'

class QuestionProvider {
  constructor (maxTime) {
    this.maxTime = maxTime
    this.questions = dataGetter()
  }

  randInt (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getQSet (timeRemaining) {
    const jamTime = 1 - timeRemaining / this.maxTime
    let qSet;
    if (jamTime < .2) {
      qSet = this.questions.forming
    } else if (jamTime < .4) {
      qSet = this.questions.prepro
    } else if (jamTime < .6) {
      qSet = this.questions.production
    } else if (jamTime < .8) {
      qSet = this.questions.polish
    } else {
      qSet = this.questions.submission
    }
    return qSet
  }

  getNext (timeRemaining) {
    let qSet = this.getQSet(timeRemaining)

    if (qSet.length === 0) {
      this.questions = dataGetter()
      qSet = this.getQSet(timeRemaining)
    }

    const qIndex = this.randInt(qSet.length - 1)
    const q = qSet[qIndex]
    qSet.splice(qIndex, 1)

    return q
  }

  calcChange(answer) {
    let change = 0
    let text = answer.commentary || ''
    if (answer.hasOwnProperty('change')) {
      change = answer.change
    } else if (answer.hasOwnProperty('goodProbability')) {
      if (Math.random() <= answer.goodProbability) {
        change = answer.goodChange
        text = answer.goodCommentary || text
      } else {
        change = answer.badChange
        text = answer.badCommentary || text
      }
    }
    return { change, text }
  }
}

export default QuestionProvider
