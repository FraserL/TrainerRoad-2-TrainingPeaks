async function parseTR(json) {


    return json.map(workout => {

        if (workout.Activity !== null) {
            return {
                date: workout.Date.replace('T00:00:00', ""),
                name: workout.Name,
                description: workout.Activity.WorkoutDescription.replace(/<\/?[^>]+(>|$)/g, ""),
                tss: workout.Activity.TSS,
                duration: workout.Activity.Duration
            }
        }
        else return {
            date: workout.Date.replace('T00:00:00', ""),
            name: workout.Name,
            duration: workout.Duration,
            description: "event",
            tss: 0
        }
    })

}

exports.parseTR = parseTR
