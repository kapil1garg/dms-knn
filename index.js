module.exports = {
  $inject: function(supply, config){
    var trainingData = [];
    var perfomanceMetrics = supply('perfomance-metrics');

    // auxiliary functions
    function euclideanDist(p, q) {
      var sumOfSquares = 0;
      for(var i = 0; i < p.length; i++) {
        sumOfSquares += Math.pow(q[i] - p[i], 2);
      }

      return Math.sqrt(sumOfSquares);
    }

    function manhattanDist(p, q) {
      var absSums = 0;
      for(var i = 0; i < p.length; i++) {
        absSums += Math.abs(q[i] - p[i]);
      }

      return absSums;
    }

    function computeDistances(train, target, distanceFunction) {
      var distances = [];
      for(var i in train) {
        var currentAttributes = train[i][0];
        var currentClass      = train[i][1];

        distances.append([currentClass, distanceFunction(currentAttributes, target)]);
      }

      return distances;
    }

    function getNearestK(classes, k) {
      classes.sort(function (a, b) {
        return a[1] - b[1];
      });

      return classes.slice(0, k);
    }

    function getMajorityVote(nearestNeighbors, classes) {
      // object to hold vote counts
      var votes = {};
      for(var i in classes) {
        votes[classes] = 0;
      }

      // count votes from all nearest neighbors
      // weight by 1/d to account for count bias
      for(var neighbor in nearestNeighbors) {
        votes[neighbor[0]] += 1 / neighbor[1];
      }

      // get and return max vote
      var maxVote = 0;
      var nearestClass = '';
      for(var vote in votes) {
        // if class has higher weight than seen, update maxVote and nearestClass
        if (votes[vote] > maxVote) {
          maxVote = votes[vote];
          nearestClass = vote;
        }
      }

      return nearestClass;
    }



    return;
  },

  $main: function($, data, config, callback){


    return callback(null, data);
  },

  $on: {
    'train': function($, data, config, callback){
      // TODO: write endpoint logic

      return callback(null, data);
    }
  }
};