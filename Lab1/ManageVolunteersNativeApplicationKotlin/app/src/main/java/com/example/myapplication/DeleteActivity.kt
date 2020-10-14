package com.example.myapplication

import android.content.DialogInterface
import android.os.Bundle

import android.view.Menu
import android.view.MenuItem
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity



class DeleteActivity : AppCompatActivity() {
    var helper: DBHelper? = null
    var TxTitle: TextView? = null
    var TxDetail: TextView? = null
    var id: Long = 0
    protected override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_delete)
        helper = DBHelper(this)
        id = getIntent().getLongExtra(DBHelper.row_id, 0)
        TxTitle = findViewById(R.id.listTitle) as TextView?
        TxDetail = findViewById(R.id.listDetail) as TextView?
        data
    }

    private val data: Unit
        private get() {
            val cursor = helper!!.oneData(id)
            if (cursor.moveToFirst()) {
                val title = cursor.getString(cursor.getColumnIndex(DBHelper.row_title))
                val detail = cursor.getString(cursor.getColumnIndex(DBHelper.row_note))
                TxTitle!!.text = title
                TxDetail!!.text = detail
            }
        }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        getMenuInflater().inflate(R.menu.delete_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.delete_edit -> {
                val builder: AlertDialog.Builder = AlertDialog.Builder(this@DeleteActivity)
                builder.setMessage("This volunteer will be deleted.")
                builder.setCancelable(true)
                builder.setPositiveButton(
                    "Delete",
                    DialogInterface.OnClickListener { dialog, which ->
                        helper!!.deleteData(id)
                        Toast.makeText(this@DeleteActivity, "Deleted", Toast.LENGTH_SHORT).show()
                        finish()
                    })
                builder.setNegativeButton(
                    "Cancel",
                    DialogInterface.OnClickListener { dialog, which -> dialog.cancel() })
                val alertDialog: AlertDialog = builder.create()
                alertDialog.show()
            }
        }
        return super.onOptionsItemSelected(item)
    }
}